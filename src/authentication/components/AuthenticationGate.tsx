import { Client } from "@notionhq/client";
import { PropsWithChildren, useMemo } from "react";
import styled from "styled-components";
import { AuthenticationContext } from "../context/AuthenticationContext";

const BlankRoot = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const AuthenticationGate = ({ children }: PropsWithChildren<{}>) => {
  const notionAPIKey = process.env.REACT_APP_NOTION_API_KEY;
  const notionClient = useMemo(() => {
    return new Client({
      auth: notionAPIKey,
    });
  }, [notionAPIKey]);

  if (!notionAPIKey) {
    return (
      <BlankRoot>
        No Notion API key could be found. Please add{" "}
        <code>REACT_APP_NOTION_API_KEY</code> to the environment and try again
      </BlankRoot>
    );
  }

  return (
    <AuthenticationContext.Provider value={{ notionClient }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationGate.displayName = "AuthenticationGate";
