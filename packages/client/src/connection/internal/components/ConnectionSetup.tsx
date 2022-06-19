import styled from "styled-components";
import { Button } from "../../../shared/components/Button";
import { useConnectionSetup } from "../hooks/useConnectionSetup";
import { Settings } from "../types/Settings";

const SetupWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SetupContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const SetupStepper = styled.div`
  flex: 0;
  height: 3em;
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const OptionChips = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 1em;
`;

const OptionChip = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 1em;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

interface Props {
  existingSettings: Partial<Settings>;
  setSettings: (newSettings: Settings) => void;
}

export const ConnectionSetup = ({ existingSettings, setSettings }: Props) => {
  const { step, setStep, newSettings, setNewSettings } =
    useConnectionSetup(existingSettings);

  if (step === "local") {
    const onLocalSelect = (localSetting: boolean) => () => {
      setNewSettings({ ...newSettings, local: localSetting });
    };
    return (
      <SetupWrapper>
        <SetupContents>
          <p>
            Would you like to connect to Notion or save data to your local
            device?
          </p>
          <OptionChips>
            <OptionChip onClick={onLocalSelect(false)}>
              <h2>Connect to Notion</h2>
              <input
                type="checkbox"
                checked={newSettings.local === false}
                onChange={(e) => {
                  if (e.target.checked) onLocalSelect(false);
                }}
              />
            </OptionChip>
            <OptionChip onClick={onLocalSelect(true)}>
              <h2>Use local device</h2>
              <input
                type="checkbox"
                checked={newSettings.local === true}
                onChange={(e) => {
                  if (e.target.checked) onLocalSelect(true);
                }}
              />
            </OptionChip>
          </OptionChips>
        </SetupContents>
        <SetupStepper>
          <span />
          <Button
            use="filled"
            title={
              newSettings.local === undefined
                ? "Select an option to continue"
                : "Click this button to proceed to the next step"
            }
            disabled={newSettings.local === undefined}
            onClick={() => setStep("database-select")}
          >
            Continue
          </Button>
        </SetupStepper>
      </SetupWrapper>
    );
  }

  if (step === "database-select") {
    return (
      <SetupWrapper>
        <SetupContents>
          Here's where you pick a database to connect with
        </SetupContents>
        <SetupStepper>
          <Button use="outlined" onClick={() => setStep("local")}>
            Go Back
          </Button>
          <Button use="filled" onClick={() => setStep("finished")}>
            Continue
          </Button>
        </SetupStepper>
      </SetupWrapper>
    );
  }

  if (step === "finished") {
    return (
      <SetupWrapper>
        <SetupContents>
          <p>
            Awesome stuff. You're all set to start tracking your habits. Click
            "Start" below to continue
          </p>
        </SetupContents>
        <SetupStepper>
          <span />
          <Button
            use="filled"
            onClick={() => {
              setSettings(newSettings as Settings);
            }}
          >
            Continue
          </Button>
        </SetupStepper>
      </SetupWrapper>
    );
  }

  throw new Error("Unrecognized step");
};
