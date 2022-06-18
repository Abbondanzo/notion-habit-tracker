import { Settings } from "../types/Settings";

export const isSetupIncomplete = (settings: Partial<Settings>): boolean => {
  return settings.local !== undefined && settings.databaseId !== undefined;
};
