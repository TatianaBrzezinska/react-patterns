import styles from "./tracks-filters.module.css";

export function TracksFilters({
  selectedMonth,
  selectedYear,
  hideWeekends,
  setSelectedMonth,
  setSelectedYear,
  setHideWeekends,
  actions,
}: {
  selectedMonth: number;
  selectedYear: number;
  hideWeekends: boolean;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
  setHideWeekends: (hideWeekends: boolean) => void;
  actions: React.ReactNode;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className={styles.header}>
      {actions}
      <select
        className={styles.select}
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        value={selectedYear}
        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
      >
        {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="hideWeekends"
          className={styles.checkbox}
          checked={hideWeekends}
          onChange={(e) => setHideWeekends(e.target.checked)}
        />
        <label htmlFor="hideWeekends" className={styles.checkboxLabel}>
          Hide Weekends
        </label>
      </div>
    </div>
  );
}
