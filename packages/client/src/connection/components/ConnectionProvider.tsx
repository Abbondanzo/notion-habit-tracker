import { ReactNode } from "react";
import { ConnectionContext } from "../context/ConnectionContext";
import { useSettings } from "../hooks/useSettings";
import { isSetupIncomplete } from "../operators/isSetupIncomplete";
import { ConnectionSetup } from "./ConnectionSetup";

interface Props {
  children: ReactNode;
}

export const ConnectionProvider = ({ children }: Props) => {
  const [settings, setSettings] = useSettings();

  if (!settings || isSetupIncomplete(settings)) {
    return (
      <ConnectionSetup
        existingSettings={settings || {}}
        setSettings={setSettings}
      />
    );
  }

  return (
    <ConnectionContext.Provider value={settings}>
      {children}
    </ConnectionContext.Provider>
  );
};
