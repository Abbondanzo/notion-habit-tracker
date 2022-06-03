type ColumnType = "checkbox" | "number";

export interface Column {
  title: string;
  emoji?: string;
  type: ColumnType;
}

export interface CheckboxColumn extends Column {
  type: "checkbox";
  checked: boolean;
}

export interface NumberColumn extends Column {
  type: "number";
  value: number;
}
