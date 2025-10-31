import { useEffect, useState } from "react";
import { Task } from "../hooks/use-tasks";

interface TaskTracking {
  activeTaskId: string | null;
  startTime: string | null;
}
export function useTaskTrack({
  onTrack,
  tasks,
}: {
  tasks: Task[];
  onTrack: (selectedCell: { hours: number; task: Task; startAt: Date }) => void;
}) {
  const [tracking, setTracking] = useState<TaskTracking>({
    activeTaskId: null,
    startTime: null,
  });
  const [currentTrackingTime, setCurrentTrackingTime] = useState<string>("");

  useEffect(() => {
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

  const fetchTracking = async () => {
    try {
      const response = await fetch("http://localhost:3001/taskTracking");
      const data = await response.json();
      setTracking(data);
    } catch (error) {
      console.error("Error fetching tracking:", error);
    }
  };

  const startTracking = async (taskId: string) => {
    try {
      const newTracking: TaskTracking = {
        activeTaskId: taskId,
        startTime: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3001/taskTracking", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTracking),
      });

      const data = await response.json();
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
          onTrack({
            hours,
            task: activeTask,
            startAt: startTime,
          });
        }
      }

      const newTracking: TaskTracking = {
        activeTaskId: null,
        startTime: null,
      };

      const response = await fetch("http://localhost:3001/taskTracking", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTracking),
      });

      const data = await response.json();
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
