import { ReactNode, useMemo } from "react";
import { LocalConnection } from "../classes/LocalConnection";
import { RemoteConnection } from "../classes/RemoteConnection";
import { ConnectionContext } from "../context/ConnectionContext";
import { useSettings } from "../hooks/useSettings";
import { isSetupIncomplete } from "../operators/isSetupIncomplete";
import { Settings } from "../types/Settings";
import { ConnectionSetup } from "./ConnectionSetup";

interface ConnectionWithSettingsProps {
  children: ReactNode;
  settings: Settings;
}

const ConnectionWithSettings = ({
  children,
  settings,
}: ConnectionWithSettingsProps) => {
  const connection = useMemo(() => {
    return settings.local
      ? new LocalConnection()
      : new RemoteConnection(settings);
  }, [settings]);
  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
};

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
    <ConnectionWithSettings settings={settings}>
      {children}
    </ConnectionWithSettings>
  );
};
