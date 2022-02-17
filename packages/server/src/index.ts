import { Client } from "@notionhq/client";
import { inferAsyncReturnType, router, TRPCError } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import http from "http";
import { trpcErrorHandler } from "./utils/trpcErrorHandler";

const port = 4000;

const createContext = async ({ req }: CreateExpressContextOptions) => {
  if (req.headers.authorization) {
    const client = new Client({ auth: req.headers.authorization });
    return { client };
  }
  return {};
};

type Context = inferAsyncReturnType<typeof createContext>;

const appRouter = router<Context>()
  .middleware(async ({ next, ctx }) => {
    if (!ctx || !ctx.client) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Missing Authorization header",
      });
    }
    return next({ ctx: { ...ctx, client: ctx?.client! } });
  })
  .query("hello", {
    resolve: async ({ ctx }) => {
      try {
        const result = await ctx.client.search({
          query: "Habit Tracker",
        });
        return result;
      } catch (error) {
        trpcErrorHandler(error);
      }
    },
  });

export type AppRouter = typeof appRouter;

export const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: "*",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);

  const shutdown = () => {
    console.log("Server shutting down...");
    httpServer.close();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
