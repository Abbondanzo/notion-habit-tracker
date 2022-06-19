import { Database, DatabaseRepository } from "@pabbo/nht-shared";
import { trpc } from "../constants/trpc";
import { Connection } from "../types/Connection";
import { Settings } from "../types/Settings";

type RemoteClient = ReturnType<typeof trpc.createClient>;

class RemoteDatabaseRepository implements DatabaseRepository {
  private readonly trpcClient: RemoteClient;

  constructor(authorizationHeader: string) {
    this.trpcClient = trpc.createClient({
      url: "http://localhost:4000/trpc",
      headers() {
        return {
          authorization: authorizationHeader,
        };
      },
    });
  }

  getDatabases(): Promise<{ [id: string]: Database }> {
    return this.trpcClient.query("databases/getDatabases");
  }

  getDatabase(id: string): Promise<Database | undefined> {
    return this.trpcClient.query("databases/getDatabase", { databaseId: id });
  }

  createDatabase(database?: Partial<Database>): Promise<Database> {
    throw new Error("Method not implemented.");
  }

  updateDatabase(id: string, database: Database): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export class RemoteConnection implements Connection {
  readonly databaseRepository: DatabaseRepository;

  constructor(settings: Settings) {
    this.databaseRepository = new RemoteDatabaseRepository("abc");
  }
}
