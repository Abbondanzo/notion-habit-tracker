import { useContext } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import { Connection } from "../types/Connection";

export const useConnection = (): Connection => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("Component tree is not wrapped in a ConnectionProvider");
  }
  return context;
};
