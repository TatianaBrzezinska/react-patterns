import { useEffect, useRef } from "react";
import styles from "./tracks-table.module.css";

export function TracksTableLayout({
  renderDays,
  renderTask,
  summary,
  tasks,
}: {
  renderDays: (
    ref: React.RefObject<HTMLTableCellElement | null>
  ) => React.ReactNode;
  tasks: string[];
  renderTask: (task: string) => React.ReactNode;
  summary: React.ReactNode;
}) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const currentDayRef = useRef<HTMLTableCellElement>(null);
  useEffect(() => {
    if (currentDayRef.current && tableContainerRef.current) {
      const container = tableContainerRef.current;
      const cell = currentDayRef.current;
      const containerWidth = container.offsetWidth;
      const cellLeft = cell.offsetLeft;
      const cellWidth = cell.offsetWidth;

      // Center the current day in the container
      container.scrollLeft = cellLeft - containerWidth / 2 + cellWidth / 2;
    }
  }, []);

  return (
    <div className={styles.tableContainer} ref={tableContainerRef}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            {renderDays(currentDayRef)}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => renderTask(task))}
          {summary}
        </tbody>
      </table>
    </div>
  );
}
