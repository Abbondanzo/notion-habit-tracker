import { router } from "@trpc/server";
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import http from "http";

const port = 4000;

const appRouter = router().query("hello", {
  async resolve() {
    return { hello: "world" };
  },
});

export type AppRouter = typeof appRouter;

const createContext = ({}: CreateExpressContextOptions) => ({});

export const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    cors({
      origin: "*",
      credentials: true,
      // allowedHeaders: ["Content-Type", "Authorization"],
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
