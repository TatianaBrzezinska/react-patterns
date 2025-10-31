import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';

export const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.headerTitle}>Anti-patterns</h1>
        <nav className={styles.headerNav}>
          <Link 
            to="/tracks" 
            className={`${styles.navLink} ${location.pathname === '/tracks' ? styles.active : ''}`}
          >
            Tracks
          </Link>
          <Link 
            to="/tasks" 
            className={`${styles.navLink} ${location.pathname === '/tasks' ? styles.active : ''}`}
          >
            Tasks
          </Link>
        </nav>
      </div>
    </header>
  );
};
