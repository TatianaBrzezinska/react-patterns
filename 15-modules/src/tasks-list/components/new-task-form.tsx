import React from 'react';
import styles from './new-task-form.module.css';

interface NewTaskFormProps {
  newTaskTitle: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({
  newTaskTitle,
  onSubmit,
  onChange,
}) => {
  return (
    <form className={styles.inputContainer} onSubmit={onSubmit}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onChange}
        placeholder="Enter new task"
        className={styles.input}
      />
      <button type="submit" className={styles.addButton}>
        Add Task
      </button>
    </form>
  );
};
