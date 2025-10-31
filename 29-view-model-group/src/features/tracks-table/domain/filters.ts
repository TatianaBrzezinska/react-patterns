import { Track } from "@/kernel/track";

export type DateSelection = {
  selectedMonth: MonthOfYear;
  selectedYear: Year;
};
export type DayOfMonth = number;
export type MonthOfYear = number;
export type Year = number;

export const daysArray = (dateSelection: DateSelection) => {
  const days = Array.from(
    { length: daysInMonth(dateSelection) },
    (_, i) => i + 1
  );
  return days;
};

const daysInMonth = ({ selectedMonth, selectedYear }: DateSelection) => {
  // Date of the last day of the month
  return new Date(selectedYear, selectedMonth + 1, 0).getDate();
};

export const isNotWeekend = (
  { selectedMonth, selectedYear }: DateSelection,
  day: number
) => {
  const date = new Date(selectedYear, selectedMonth, day);
  return !(date.getDay() === 0 || date.getDay() === 6);
};

export const getTracksBySelectedMonth = (
  tracks: Track[],
  selection: DateSelection
) =>
  tracks.filter((track) => {
    const trackDate = new Date(track.date);
    return (
      trackDate.getMonth() === selection.selectedMonth &&
      trackDate.getFullYear() === selection.selectedYear
    );
  });
