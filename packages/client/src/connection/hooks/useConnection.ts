import { ConnectionContext } from "../context/ConnectionContext";
import { useContext } from "react";

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("Component tree is not wrapped in a ConnectionProvider");
  }
  return context;
};
