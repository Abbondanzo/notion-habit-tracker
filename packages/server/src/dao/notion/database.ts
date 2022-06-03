import { Client } from "@notionhq/client";
import { Database, DatabaseRepository } from "@pabbo/nht-shared";

export class NotionDatabaseRepository implements DatabaseRepository {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getDatabases(): Promise<{ [id: string]: Database }> {
    throw new Error("Method not implemented.");
  }

  async getDatabase(id: string): Promise<Database | undefined> {
    const database = await this.client.databases.retrieve({ database_id: id });
    console.log(database);
    throw new Error("Method not implemented.");
  }

  async createDatabase(database?: Partial<Database>): Promise<Database> {
    throw new Error("Method not implemented.");
  }

  async updateDatabase(id: string, database: Database): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
