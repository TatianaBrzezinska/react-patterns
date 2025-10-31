import { useState } from "react";

export function useTracksFilter() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hideWeekends, setHideWeekends] = useState(false);

  return {
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
