export type SelectedCell = {
  day: number;
  task: string;
  selectedMonth: number;
  selectedYear: number;
  hours?: number;
};

export type Track = {
  id: string;
  name: string;
  task: string;
  hours: number;
  date: string;
};
