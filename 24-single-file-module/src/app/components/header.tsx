import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { routes } from "@/kernel/routes";

export const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Anti-patterns</h1>
        <nav className={styles.headerNav}>
          <Link
            to={routes.tracks}
            className={`${styles.navLink} ${
              location.pathname === routes.tracks ? styles.active : ""
            }`}
          >
            Tracks
          </Link>
          <Link
            to={routes.tasks}
            className={`${styles.navLink} ${
              location.pathname === routes.tasks ? styles.active : ""
            }`}
          >
            Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
};
