import { Database } from "@pabbo/nht-shared";
import { useMutation } from "react-query";
import { useConnection } from "../../internal/hooks/useConnection";

export const useUpdateDatabase = () => {
  const connection = useConnection();
  return useMutation("databases/updateDatabase", (database: Database) =>
    connection.databaseRepository.updateDatabase(database.id, database)
  );
};
