import { Database } from "../data/schema";
import { JsonReader } from "../readers/json";

export interface DatabaseRepository {
  getDatabases(): Promise<{ [id: string]: Database }>;
  getDatabase(id: string): Promise<Database | undefined>;
  createDatabase(database?: Partial<Database>): Promise<Database>;
  updateDatabase(id: string, database: Database): Promise<void>;
}

export class JsonDatabaseRepository implements DatabaseRepository {
  private readonly reader: JsonReader;

  constructor(reader: JsonReader) {
    this.reader = reader;
    this.validate();
  }

  private validate() {
    const data = this.reader.read();
    // If databases have not been initialized, write them and exit
    if (!data.databases) {
      data.databases = [];
      this.reader.write(data);
      return;
    }
    if (typeof data.databases !== "object") {
      throw new Error("JSON is malformed");
    }
  }

  async getDatabases(): Promise<{ [id: string]: Database }> {
    return this.reader.read()["databases"];
  }

  async getDatabase(id: string): Promise<Database | undefined> {
    const databases = await this.getDatabases();
    return databases[id];
  }

  async createDatabase(opts: Partial<Database> = {}): Promise<Database> {
    const newDatabase: Database = {
      id: "123",
      title: "New Database",
      schema: [],
      ...opts,
    };
    await this.updateDatabase(newDatabase.id, newDatabase);
    return newDatabase;
  }

  async updateDatabase(id: string, database: Database): Promise<void> {
    const databases = await this.getDatabases();
    databases[id] = database;
    this.reader.write(databases);
  }
}
