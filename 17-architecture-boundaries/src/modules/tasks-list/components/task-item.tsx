import React from "react";
import styles from "./task-item.module.css";
import { Task } from "../hooks/use-tasks";

interface TaskItemProps {
  task: Task;
  isTracking: boolean;
  trackingStartTime: string | null;
  canStartTracking: boolean;
  onToggleDone: (task: Task) => void;
  onStartTracking: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isTracking,
  trackingStartTime,
  canStartTracking,
  onToggleDone,
  onStartTracking,
  onDeleteTask,
}) => {
  return (
    <li
      className={`${styles.item} ${isTracking ? styles.tracking : ""} ${
        task.isDone ? styles.done : ""
      }`}
    >
      <div className={styles.content}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={() => onToggleDone(task)}
            className={styles.checkbox}
          />
          <span className={styles.taskTitle}>{task.title}</span>
        </label>
        {isTracking && trackingStartTime && (
          <span className={styles.taskTime}>
            Started at: {new Date(trackingStartTime).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className={styles.actions}>
        {canStartTracking && (
          <button
            onClick={() => onStartTracking(task.id)}
            className={styles.trackButton}
          >
            Start
          </button>
        )}
        <button
          onClick={() => onDeleteTask(task.id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
