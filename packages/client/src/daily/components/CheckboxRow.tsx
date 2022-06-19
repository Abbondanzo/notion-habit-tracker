import { trpc } from "../../connection/internal/constants/trpc";

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
  const { data, error } = trpc.useQuery([
    "databases/getDatabase",
    { databaseId: "abc" },
  ]);
  const { data: databases, error: databasesError } = trpc.useQuery([
    "databases/getDatabases",
  ]);
  return (
    <div>
      <p>Requesting some data bb.</p>
      <p style={{ textAlign: "left", fontSize: 12 }}>
        <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
      </p>
      <p style={{ textAlign: "left", fontSize: 12 }}>
        <pre>
          {databasesError
            ? databasesError.message
            : JSON.stringify(databases, null, 2)}
        </pre>
      </p>
    </div>
  );
};
