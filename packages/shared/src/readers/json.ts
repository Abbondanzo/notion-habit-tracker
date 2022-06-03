export interface JsonReader {
  read(): { [key: string]: any };
  write(data: { [key: string]: any }): void;
}
