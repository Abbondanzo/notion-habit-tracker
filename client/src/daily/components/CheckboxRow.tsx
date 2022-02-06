import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useNotionClient } from "../../authentication/hooks/useNotionClient";
import { CheckboxColumn } from "./CheckboxColumn";

interface Column {
  title: string;
  emoji: string;
  checked: boolean;
}

const SAMPLE_CHECKBOXES: Column[] = [
  { title: "Workout", emoji: "👟", checked: true },
  { title: "Meditation", emoji: "🧘🏽‍♀️", checked: false },
  { title: "7+ hrs Sleep", emoji: "😴", checked: true },
  { title: "Reading (10+ min)", emoji: "📚", checked: false },
  { title: "Screen Time (minutes)", emoji: "📱", checked: true },
];

export const CheckboxRow = () => {
  const [db, setDb] = useState<string>();
  const [error, setError] = useState<any>();

  const client = useNotionClient();

  useEffect(() => {
    setDb(undefined);
    setError(undefined);
    client
      .search({ filter: { value: "database", property: "object" } })
      .then((resp) => {
        setDb(JSON.stringify(resp, null, 2));
      })
      .catch((error) => {
        setError(error && error.message);
      });
  }, [client]);

  return (
    <div>
      <p>Requesting some data bb.</p>
      <p>{error ? error : db}</p>
    </div>
  );
};
