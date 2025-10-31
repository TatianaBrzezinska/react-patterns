import { TracksTable } from "@/features/tracks-table";
import styles from "./page.module.css";

export function TracksTablePage() {
  return (
    <div className={styles.container}>
      <TracksTable />
    </div>
  );
}
