import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = (storageKey: string, initialValue?: string) => {
  const [curKey] = useState(storageKey);
  useEffect(() => {
    if (curKey !== storageKey) {
      console.warn("Don't reuse a local storage hook with a different key");
    }
  }, [storageKey, curKey]);
  const [state, setState] = useState(() => {
    if (localStorage.getItem(storageKey) !== null) {
      return localStorage.getItem(storageKey)!;
    } else if (initialValue) {
      localStorage.setItem(storageKey, initialValue);
      return initialValue;
    } else {
      return initialValue;
    }
  });
  const setter = useCallback(
    (newValue: string) => {
      setState(newValue);
      localStorage.setItem(storageKey, newValue);
    },
    [storageKey]
  );
  return [state, setter] as const;
};
