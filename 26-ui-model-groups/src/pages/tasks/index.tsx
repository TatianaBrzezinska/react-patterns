import styles from "./style.module.css";
import { TaskList } from "@/features/tasks-list";

export function TaskListPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>
      <TaskList />
    </div>
  );
}
