import styles from "./tracks-table.module.css";

export function TracksTable({
  tableContainerRef,
  days,
  children,
}: {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  days: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.tableContainer} ref={tableContainerRef}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task</th>
            {days}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
