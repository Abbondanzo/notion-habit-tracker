import { ReactNode, useMemo } from "react";
import { LocalConnection } from "../../internal/classes/LocalConnection";
import { RemoteConnection } from "../../internal/classes/RemoteConnection";
import { ConnectionSetup } from "../../internal/components/ConnectionSetup";
import { ConnectionContext } from "../../internal/context/ConnectionContext";
import { useSettings } from "../../internal/hooks/useSettings";
import { isSetupIncomplete } from "../../internal/operators/isSetupIncomplete";
import { Settings } from "../../internal/types/Settings";

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
