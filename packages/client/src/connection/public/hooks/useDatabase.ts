import { QueryClient, useQuery } from "react-query";

new QueryClient();

export const useDatabase = (databaseId: string) => {
  useQuery("databases/useDatabase", {});
};
