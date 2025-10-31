import { Outlet } from "react-router-dom";
import styles from "./form-layout.module.css";
export function FormLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Outlet />
      </div>
    </div>
  );
}
