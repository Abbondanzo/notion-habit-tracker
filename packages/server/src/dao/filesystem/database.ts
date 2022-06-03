import { JsonDatabaseRepository } from "@pabbo/nht-shared";
import fs from "fs";
import path from "path";
import { FilesystemReader } from "./reader";

export class FilesystemDatabaseRepository extends JsonDatabaseRepository {
  constructor() {
    super(new FilesystemReader(FilesystemDatabaseRepository.DATABASE_FILE));
  }

  private static get DATABASE_FILE(): string {
    return path.join(__dirname, "..", "..", "..", "tmp", "databases.json");
  }
}
