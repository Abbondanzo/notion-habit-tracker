import { JsonReader } from "@pabbo/nht-shared";
import { JsonDatabaseRepository } from "@pabbo/nht-shared";
import { DatabaseRepository } from "@pabbo/nht-shared";
import { useMemo } from "react";

class LocalStorageJsonReader implements JsonReader {
  private static STORAGE_KEY = "NHT_DB_STORAGE";

  read(): { [key: string]: any } {
    const maybeData = window.localStorage.getItem(
      LocalStorageJsonReader.STORAGE_KEY
    );
    if (!maybeData) {
      this.write({});
      return {};
    } else {
      try {
        return JSON.parse(maybeData);
      } catch (err) {
        console.error(err);
        this.write({});
        return {};
      }
    }
  }

  write(data: { [key: string]: any }): void {
    try {
      window.localStorage.setItem(
        LocalStorageJsonReader.STORAGE_KEY,
        JSON.stringify(data)
      );
    } catch (err) {
      console.error(err);
    }
  }
}

export const useLocalDatabaseRepository = (): DatabaseRepository => {
  return useMemo(() => {
    return new JsonDatabaseRepository(new LocalStorageJsonReader());
  }, []);
};
