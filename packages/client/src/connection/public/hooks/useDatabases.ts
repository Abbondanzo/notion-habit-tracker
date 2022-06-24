import { Database } from "@pabbo/nht-shared";
import { useQuery } from "react-query";
import { useConnection } from "../../internal/hooks/useConnection";

export const useDatabases = () => {
  const connection = useConnection();
  return useQuery<{ [key: string]: Database }, Error>(
    "databases/useDatabases",
    {
      queryFn: () => connection.databaseRepository.getDatabases(),
    }
  );
};
