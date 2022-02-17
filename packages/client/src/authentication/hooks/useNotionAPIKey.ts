import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export const useNotionAPIKey = (): string => {
  const { notionAPIKey } = useContext(AuthenticationContext);
  if (!notionAPIKey) {
    throw new Error("Notion client has not been provided in this context");
  }
  return notionAPIKey;
};
