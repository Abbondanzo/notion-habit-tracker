import { DatabaseRepository, JsonDatabaseRepository } from "@pabbo/nht-shared";
import { Connection } from "../types/Connection";
import { LocalStorageJsonReader } from "./LocalStorageJsonReader";

export class LocalConnection implements Connection {
  readonly databaseRepository: DatabaseRepository;

  constructor() {
    this.databaseRepository = new JsonDatabaseRepository(
      new LocalStorageJsonReader("NHT_DB_STORAGE")
    );
  }
}
