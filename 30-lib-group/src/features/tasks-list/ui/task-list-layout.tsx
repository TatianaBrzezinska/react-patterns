import React from "react";
import styles from "./task-list-layout.module.css";

interface TaskListLayoutProps {
  actions: React.ReactNode;
  list: React.ReactNode;
}

export const TaskListLayout: React.FC<TaskListLayoutProps> = ({
  actions,
  list,
}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>
      {actions}
      <ul className={styles.list}>{list}</ul>
    </div>
  );
};
