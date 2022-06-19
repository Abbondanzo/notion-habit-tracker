import { LocalStorageJsonReader } from "./LocalStorageJsonReader";

type Observer<T> = (value: T) => void;

/**
 * JSON-based local storage observer. Rather than pushing off JSON parsing to call sites, we do it
 * all here.
 */
export class LocalStorageObserver<T> {
  private static VALUE_KEY = "value";

  private readonly jsonReader: LocalStorageJsonReader;
  private observers: Observer<T>[];

  constructor(storageKey: string) {
    this.jsonReader = new LocalStorageJsonReader(storageKey);
    this.observers = [];
  }

  getValue = (): T | null => {
    const maybeObject = this.jsonReader.read()[LocalStorageObserver.VALUE_KEY];
    return maybeObject === undefined ? null : maybeObject;
  };

  setValue = (value: T) => {
    this.jsonReader.write({ [LocalStorageObserver.VALUE_KEY]: value });
  };

  addObserver = (observer: Observer<T>) => {
    this.observers.push(observer);
  };

  removeObserver = (observer: Observer<T>) => {
    this.observers = this.observers.filter((o) => o === observer);
  };
}
