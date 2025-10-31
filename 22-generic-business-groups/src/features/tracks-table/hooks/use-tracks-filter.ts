import { Track } from "@/interfaces/track";
import { useMemo, useState } from "react";

export function useTracksFilter({ tracks }: { tracks: Track[] }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hideWeekends, setHideWeekends] = useState(false);

  const isWeekend = (day: number) => {
    const date = new Date(selectedYear, selectedMonth, day);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedMonth, selectedYear]);

  const visibleDays = useMemo(() => {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return hideWeekends ? days.filter((day) => !isWeekend(day)) : days;
  }, [hideWeekends, selectedMonth, selectedYear]);

  const filteredTracks = tracks.filter((track) => {
    const trackDate = new Date(track.date);
    return (
      trackDate.getMonth() === selectedMonth &&
      trackDate.getFullYear() === selectedYear &&
      (!hideWeekends || !isWeekend(trackDate.getDate()))
    );
  });

  return {
    visibleDays,
    filteredTracks,
    filters: {
      selectedMonth,
      selectedYear,
      hideWeekends,
    },
    setFilters: {
      setSelectedMonth,
      setSelectedYear,
      setHideWeekends,
    },
  };
}
