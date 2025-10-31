import React from "react";
import styles from "./new-task-form.module.css";

interface NewTaskFormProps {
  onNewTask: (name: string) => Promise<void>;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onNewTask }) => {
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name") as string;
    if (!name.trim()) return;

    onNewTask(name);
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleAddTask}>
      <input
        type="text"
        name="name"
        placeholder="Enter new task"
        className={styles.input}
      />
      <button type="submit" className={styles.addButton}>
        Add Task
      </button>
    </form>
  );
};
