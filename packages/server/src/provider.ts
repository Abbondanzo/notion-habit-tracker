import { NotionDatabaseRepository } from "./dao/notion/database";
import { DatabaseRepository } from "@pabbo/nht-shared";
import { FilesystemDatabaseRepository } from "./dao/filesystem/database";
import { Client } from "@notionhq/client";

export interface Provider {
  databaseRepository: DatabaseRepository;
}

export class FilesystemProvider implements Provider {
  databaseRepository: DatabaseRepository;

  constructor() {
    this.databaseRepository = new FilesystemDatabaseRepository();
  }
}

export class NotionProvider implements Provider {
  databaseRepository: DatabaseRepository;

  constructor(client: Client) {
    this.databaseRepository = new NotionDatabaseRepository(client);
  }
}
