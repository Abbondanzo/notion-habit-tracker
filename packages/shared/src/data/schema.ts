import { Column } from "./column";

export interface Entry {
  date: string;
  columns: Column[];
}

export interface Database {
  id: string;
  title: string;
  schema: Column[];
}
