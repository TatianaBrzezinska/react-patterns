import React from "react";
import styles from "./task-tracking.module.css";
import { Task } from "../model/use-tasks";

interface TaskTrackingProps {
  currentTrackingTime: string;
  activeTask: Task | undefined;
  onStopTracking: () => void;
}

export const TaskTracking: React.FC<TaskTrackingProps> = ({
  currentTrackingTime,
  activeTask,
  onStopTracking,
}) => {
  if (!currentTrackingTime || !activeTask) return null;

  return (
    <div className={styles.trackingInfo}>
      <div className={styles.trackingDetails}>
        <span className={styles.trackingTask}>{activeTask.title}</span>
        <span className={styles.trackingTime}>{currentTrackingTime}</span>
      </div>
      <button
        className={`${styles.trackButton} ${styles.trackingButton}`}
        onClick={onStopTracking}
      >
        Stop
      </button>
    </div>
  );
};
