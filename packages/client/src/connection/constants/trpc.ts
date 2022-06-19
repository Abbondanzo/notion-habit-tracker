import type { AppRouter } from "@pabbo/nht-server";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
