import { Client } from "@notionhq/client";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export const useNotionClient = (): Client => {
  const { notionClient } = useContext(AuthenticationContext);
  if (!notionClient) {
    throw new Error("Notion client has not been provided in this context");
  }
  return notionClient;
};
