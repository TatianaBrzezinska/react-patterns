import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import { routes } from "@/kernel/routes";
import { useAuth } from "@/services/auth";

export const Header = () => {
  const location = useLocation();

  const { user, logout } = useAuth();
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
        {user ? (
          <div className={styles.headerUser}>
            <span>{user?.username}</span>
            <button className={styles.logoutButton} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.headerUser}>
            <Link to={routes.login}>Login</Link>
            <Link to={routes.register}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};
