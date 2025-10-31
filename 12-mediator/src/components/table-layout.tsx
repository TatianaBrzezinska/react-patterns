import styles from "./table-layout.module.css";

export function TableLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
