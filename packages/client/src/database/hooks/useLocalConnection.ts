import { useLocalDatabaseRepository } from "./useLocalDatabaseRepository";
import { Connection } from "./../types/Connection";

export const useLocalConnection = (): Connection => {
  const databaseRepository = useLocalDatabaseRepository();
  return {
    databaseRepository,
  };
};
