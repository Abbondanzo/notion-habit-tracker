import { JsonReader } from "@pabbo/nht-shared";

export class LocalStorageJsonReader implements JsonReader {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.read = this.read.bind(this);
    this.write = this.write.bind(this);
  }

  read(): { [key: string]: any } {
    const maybeData = window.localStorage.getItem(this.storageKey);
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
      window.localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }
}
