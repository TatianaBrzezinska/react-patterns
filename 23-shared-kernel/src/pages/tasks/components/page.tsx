import React from "react";
import styles from "./page.module.css";
import { TaskList } from "@/features/tasks-list";

export const TaskListPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>
      <TaskList />
    </div>
  );
};
