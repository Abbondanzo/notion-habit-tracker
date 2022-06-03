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
  if (req.headers.authorization) {
    const client = new Client({ auth: req.headers.authorization });
    return { provider: new NotionProvider(client) };
  } else if (isDev) {
    return { provider: new FilesystemProvider() };
  } else {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing Authorization header",
    });
  }
};

type AuthenticatedContext = NonNullable<Context>;

const databases = router<AuthenticatedContext>().query("getDatabase", {
  input: z.object({ databaseId: z.string() }),
  resolve: async ({ ctx, input }) => {
    return ctx.provider.databaseRepository.getDatabase(input.databaseId);
  },
});

export const appRouter = router<Context>().merge("databases/", databases);

export type AppRouter = typeof appRouter;
