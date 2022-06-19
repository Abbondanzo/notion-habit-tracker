import { createContext } from "react";
import { Connection } from "../types/Connection";

export const ConnectionContext = createContext<Connection | null>(null);
