import { Client } from "@notionhq/client";
import { PropsWithChildren, useMemo } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext";

export const AuthenticationGate = ({ children }: PropsWithChildren<{}>) => {
  const notionAPIKey = process.env.NOTION_API_KEY;
  const notionClient = useMemo(() => {
    return new Client({
      auth: notionAPIKey,
    });
  }, [notionAPIKey]);

  if (!notionAPIKey) {
    return (
      <div>
        No Notion API key could be found. Please add <code>NOTION_API_KEY</code>{" "}
        to the environment and try again
      </div>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ notionClient }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationGate.displayName = "AuthenticationGate";
