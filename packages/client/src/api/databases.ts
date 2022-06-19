import { api } from "./_client";

export const retrieve = ({ databaseId }: { databaseId: string }) => {
  return api.get(`/databases/retrieve?databaseId=${databaseId}`);
};
