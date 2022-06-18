type Observer<T> = (value: T) => void;

/**
 * JSON-based local storage observer. Rather than pushing off JSON parsing to call sites, we do it
 * all here.
 */
export class LocalStorageObserver<T> {
  private readonly storageKey: string;
  private observers: Observer<T>[];

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.observers = [];
  }

  getValue = (): T | null => {
    try {
      const item = window.localStorage.getItem(this.storageKey);
      return item && JSON.parse(item);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  setValue = (value: T) => {
    try {
      window.localStorage.setItem(this.storageKey, JSON.stringify(value));
      this.observers.forEach((o) => {
        try {
          o(value);
        } catch (err) {
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  addObserver = (observer: Observer<T>) => {
    this.observers.push(observer);
  };

  removeObserver = (observer: Observer<T>) => {
    this.observers = this.observers.filter((o) => o === observer);
  };
}
