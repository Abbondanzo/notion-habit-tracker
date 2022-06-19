import { FilesystemProvider, NotionProvider, Provider } from "./provider";
import { isDev } from "./utils/isDev";
import { Client } from "@notionhq/client";
import { inferAsyncReturnType, router, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { z } from "zod";

interface Context {
  provider: Provider;
}

export const createContext = async ({
  req,
}: CreateExpressContextOptions): Promise<Context> => {
  if (isDev) {
    return { provider: new FilesystemProvider() };
  } else if (req.headers.authorization) {
    const client = new Client({ auth: req.headers.authorization });
    return { provider: new NotionProvider(client) };
  } else {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing Authorization header",
    });
  }
};

type AuthenticatedContext = NonNullable<Context>;

const databases = router<AuthenticatedContext>()
  .query("getDatabase", {
    input: z.object({ databaseId: z.string() }),
    resolve: async ({ ctx, input }) => {
      const database = await ctx.provider.databaseRepository.getDatabase(
        input.databaseId
      );
      if (!database) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find a database by the given ID",
        });
      }
      return database;
    },
  })
  .query("getDatabases", {
    resolve: async ({ ctx }) => {
      return ctx.provider.databaseRepository.getDatabases();
    },
  });

export const appRouter = router<Context>().merge("databases/", databases);

export type AppRouter = typeof appRouter;
