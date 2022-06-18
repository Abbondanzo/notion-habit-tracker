import { createContext } from "react";

export interface ConnectionContextOptions {
  local: boolean;
  databaseId: string;
}

export const ConnectionContext = createContext<ConnectionContextOptions | null>(
  null
);
