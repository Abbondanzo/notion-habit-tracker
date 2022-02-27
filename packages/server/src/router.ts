import { Client } from "@notionhq/client";
import { inferAsyncReturnType, router, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { z } from "zod";

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  if (req.headers.authorization) {
    const client = new Client({ auth: req.headers.authorization });
    return { client };
  }
};

type Context = inferAsyncReturnType<typeof createContext>;
type AuthenticatedContext = NonNullable<Context>;

const databases = router<AuthenticatedContext>().query("retrieve", {
  input: z.object({ databaseId: z.string() }),
  resolve: async ({ ctx, input }) => {
    return ctx.client.databases.retrieve({ database_id: input.databaseId });
  },
});

export const appRouter = router<Context>()
  .middleware(async ({ next, ctx }) => {
    if (!ctx || !ctx.client) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Missing Authorization header",
      });
    }
    return next({ ctx: { ...ctx, client: ctx?.client! } });
  })
  .merge("databases/", databases);

export type AppRouter = typeof appRouter;
