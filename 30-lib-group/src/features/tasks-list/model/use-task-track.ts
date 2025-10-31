import { useEffect, useState } from "react";
import { Task } from "../domain/task";
import { taskTrackingApi, TaskTrackingDto } from "../lib/api";

export function useTaskTrack({
  onTrack,
  tasks,
}: {
  tasks: Task[];
  onTrack: (selectedCell: { hours: number; task: Task; startAt: Date }) => void;
}) {
  const [tracking, setTracking] = useState<TaskTrackingDto>({
    activeTaskId: null,
    startTime: null,
  });
  const [currentTrackingTime, setCurrentTrackingTime] = useState<string>("");

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        const data = await taskTrackingApi.fetchTracking();
        setTracking(data);
      } catch (error) {
        console.error("Error fetching tracking:", error);
      }
    };
    fetchTracking();
  }, []);

  useEffect(() => {
    if (tracking.startTime) {
      const timer = setInterval(() => {
        const startTime = new Date(tracking.startTime!).getTime();
        const currentTime = new Date().getTime();
        const diff = currentTime - startTime;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCurrentTrackingTime(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setCurrentTrackingTime("");
    }
  }, [tracking.startTime]);

  const startTracking = async (taskId: string) => {
    try {
      const newTracking: TaskTrackingDto = {
        activeTaskId: taskId,
        startTime: new Date().toISOString(),
      };
      const data = await taskTrackingApi.updateTracking(newTracking);
      setTracking(data);
    } catch (error) {
      console.error("Error updating tracking:", error);
    }
  };

  const stopTracking = async () => {
    try {
      if (tracking.activeTaskId && tracking.startTime) {
        const startTime = new Date(tracking.startTime);
        const endTime = new Date();
        const hours =
          (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

        const activeTask = tasks.find(
          (task) => task.id === tracking.activeTaskId
        );

        if (activeTask) {
          onTrack({ hours, task: activeTask, startAt: startTime });
        }
      }

      const newTracking: TaskTrackingDto = {
        activeTaskId: null,
        startTime: null,
      };
      const data = await taskTrackingApi.updateTracking(newTracking);
      setTracking(data);
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  };

  const activeTask = tasks.find((task) => task.id === tracking.activeTaskId);
  return {
    activeTask,
    tracking,
    startTracking,
    stopTracking,
    currentTrackingTime,
  };
}
