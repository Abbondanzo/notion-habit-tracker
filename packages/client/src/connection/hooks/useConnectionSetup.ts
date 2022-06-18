import { useState } from "react";
import { Settings } from "../types/Settings";

type ConnectionSetupStep = "local" | "database-select" | "finished";

export const useConnectionSetup = (existingSettings: Partial<Settings>) => {
  const [newSettings, setNewSettings] =
    useState<Partial<Settings>>(existingSettings);
  const [step, setStep] = useState((): ConnectionSetupStep => {
    if (newSettings.local === undefined) {
      return "local";
    } else if (newSettings.databaseId === undefined) {
      return "database-select";
    } else {
      return "finished";
    }
  });
  return { step, setStep, newSettings, setNewSettings };
};
