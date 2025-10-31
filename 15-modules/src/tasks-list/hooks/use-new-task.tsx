import { useState } from "react";

export function useNewTask({
  onAddTask,
}: {
  onAddTask: (name: string) => Promise<void>;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask(newTaskTitle).finally(() => {
      setNewTaskTitle("");
    });
  };

  const handleTaskTitleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTaskTitle(e.target.value);
  };

  return {
    newTaskTitle,
    handleAddTask,
    handleTaskTitleInputChange,
  };
}
