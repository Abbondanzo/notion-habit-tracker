import { Database } from "@pabbo/nht-shared";
import { useMutation } from "react-query";
import { useConnection } from "../../internal/hooks/useConnection";

export const useCreateDatabase = () => {
  const connection = useConnection();
  return useMutation(
    "databases/createDatabase",
    (database: Partial<Database>) =>
      connection.databaseRepository.createDatabase(database)
  );
};
