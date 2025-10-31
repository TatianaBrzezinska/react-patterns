import { useState } from "react";
import { Task } from "../domain/task";

export function useTasksFilters({ tasks }: { tasks: Task[] }) {
  const [filterStatus, setFilterStatus] = useState<"all" | "done" | "active">(
    "all"
  );

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "done") return task.isDone;
    if (filterStatus === "active") return !task.isDone;
    return true;
  });

  return {
    filteredTasks,
    filters: {
      filterStatus,
      setFilterStatus,
    },
  };
}
