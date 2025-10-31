import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3001/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (title: string) => {
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          isDone: false,
        }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleDone = async (task: Task) => {
    try {
      const updatedTask = {
        ...task,
        isDone: !task.isDone,
      };

      const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await response.json();
      setTasks(tasks.map((t) => (t.id === task.id ? data : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleDone,
  };
}
