import { Client } from "@notionhq/client";
import { createContext } from "react";

interface AuthenticationContextVariables {
  notionClient?: Client;
}

export const AuthenticationContext =
  createContext<AuthenticationContextVariables>({});
