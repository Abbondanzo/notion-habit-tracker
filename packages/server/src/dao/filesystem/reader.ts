import { JsonReader } from "@pabbo/nht-shared/src/readers/json";
import fs from "fs";
import path from "path";

export class FilesystemReader implements JsonReader {
  private readonly path: string;

  constructor(path: string) {
    this.path = path;
    this.validate();
  }

  private validate() {
    const dir = path.join(this.path, "..");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (!fs.existsSync(this.path)) {
      this.write({});
      return;
    }
    const rawData = this.readRaw();
    if (rawData === "") {
      this.write({});
      return;
    }
    const data = this.read();
    if (typeof data !== "object") {
      throw new Error(`File ${this.path} contains illegal data`);
    }
  }

  private readRaw(): string {
    return fs.readFileSync(this.path, { encoding: "utf-8" });
  }

  read(): { [key: string]: any } {
    return JSON.parse(this.readRaw());
  }

  write(data: { [key: string]: any }) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2), {
      encoding: "utf-8",
      flag: "",
    });
  }
}
