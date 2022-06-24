import { Database } from "@pabbo/nht-shared";
import { useQuery } from "react-query";
import { useConnection } from "./../../internal/hooks/useConnection";

export const useDatabase = (databaseId: string) => {
  const connection = useConnection();
  return useQuery<Database | undefined, Error>("databases/useDatabase", {
    queryFn: () => connection.databaseRepository.getDatabase(databaseId),
  });
};
