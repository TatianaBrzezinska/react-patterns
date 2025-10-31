import { Header } from "./header";
import { Outlet } from "react-router-dom";

import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};
