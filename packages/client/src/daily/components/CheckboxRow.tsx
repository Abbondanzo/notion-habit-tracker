import { trpc } from "../../http/constants/trpc";

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
  const { data, isLoading, error } = trpc.useQuery(["hello"]);

  return (
    <div>
      <p>Requesting some data bb.</p>
      <p>{error ? error.message : JSON.stringify(data, null, 2)}</p>
    </div>
  );
};
