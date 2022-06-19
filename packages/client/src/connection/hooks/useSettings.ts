import { useEffect, useState } from "react";
import { Settings } from "../types/Settings";
import { LocalStorageObserver } from "../classes/LocalStorageObserver";

const SETTINGS_KEY = "NHT_SETTINGS";
const settingsObserver = new LocalStorageObserver<Settings>(SETTINGS_KEY);

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(() =>
    settingsObserver.getValue()
  );
  useEffect(() => {
    const observer = (newSettings: Settings) => {
      setSettings(newSettings);
    };
    settingsObserver.addObserver(observer);
    return () => settingsObserver.removeObserver(observer);
  }, []);
  return [settings, settingsObserver.setValue] as const;
};
