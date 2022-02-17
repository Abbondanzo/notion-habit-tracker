import { createContext } from "react";

interface AuthenticationContextVariables {
  notionAPIKey?: string;
}

export const AuthenticationContext =
  createContext<AuthenticationContextVariables>({});
