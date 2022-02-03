import { Grid } from "semantic-ui-react";
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
  return (
    <Grid container columns="equal">
      {SAMPLE_CHECKBOXES.map((checkbox, index) => {
        return (
          <CheckboxColumn
            key={index}
            title={checkbox.title}
            emoji={checkbox.emoji}
            checked={checkbox.checked}
            onToggle={(checked: boolean) => console.log(index, checked)}
          />
        );
      })}
    </Grid>
  );
};
