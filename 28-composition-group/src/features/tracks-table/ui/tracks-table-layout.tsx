import styles from "./tracks-table.module.css";
import { useScrollTo } from "@/shared/dom-api";

export function TracksTableLayout({
  renderDays,
  summary,
  tasks,
}: {
  renderDays: (
    ref: React.RefObject<HTMLTableCellElement | null>
  ) => React.ReactNode;
  tasks: React.ReactNode[];
  summary: React.ReactNode;
}) {
  const { containerRef, targetRef } = useScrollTo();

  return (
    <div className={styles.tableContainer} ref={containerRef}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            {renderDays(targetRef)}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
          {summary}
        </tbody>
      </table>
    </div>
  );
}
