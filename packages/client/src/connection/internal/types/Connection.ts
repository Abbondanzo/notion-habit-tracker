import { DatabaseRepository } from "@pabbo/nht-shared";

export interface Connection {
  readonly databaseRepository: DatabaseRepository;
}
