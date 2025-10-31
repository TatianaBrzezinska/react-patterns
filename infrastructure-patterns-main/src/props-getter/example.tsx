import { useState } from "react";
import styles from "./example.module.css";

interface Task {
  id: number;
  title: string;
  status: "todo" | "done";
}
export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", status: "done" },
    { id: 2, title: "Build an app", status: "todo" },
    { id: 3, title: "Write tests", status: "todo" },
    { id: 4, title: "Deploy to production", status: "todo" },
    { id: 5, title: "Add documentation", status: "todo" },
  ]);

  const [dragState, setDragState] = useState<{
    draggedId: number | null;
    draggedOverId: number | null;
  }>({
    draggedId: null,
    draggedOverId: null,
  });

  const handleDragStart = (task: Task) => (e: React.DragEvent) => {
    // Required for Firefox
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.effectAllowed = "move";
    setDragState((prev) => ({
      ...prev,
      draggedId: task.id,
    }));
  };

  const handleDragEnter = (task: Task) => (e: React.DragEvent) => {
    e.preventDefault();
    if (task.id !== dragState.draggedId) {
      setDragState((prev) => ({
        ...prev,
        draggedOverId: task.id,
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnd = () => {
    const { draggedId, draggedOverId } = dragState;

    if (draggedId !== null && draggedOverId !== null) {
      const draggedTask = tasks.find((task) => task.id === draggedId);
      const draggedOverTask = tasks.find((task) => task.id === draggedOverId);

      if (draggedTask && draggedOverTask) {
        const newTasks = [...tasks];
        const draggedIdx = newTasks.indexOf(draggedTask);
        const draggedOverIdx = newTasks.indexOf(draggedOverTask);

        // Remove dragged item and insert at new position
        newTasks.splice(draggedIdx, 1);
        newTasks.splice(draggedOverIdx, 0, draggedTask);

        setTasks(newTasks);
      }
    }

    setDragState({
      draggedId: null,
      draggedOverId: null,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles["dnd-container"]}>
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            className={styles["dnd-item"]}
            onDragStart={handleDragStart(task)}
            onDragEnter={handleDragEnter(task)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            data-dragged={task.id === dragState.draggedId}
            data-dragged-over={task.id === dragState.draggedOverId}
          >
            <div className={styles.task}>
              <span className={styles["drag-handle"]}>⋮⋮</span>
              <span className={styles["task-title"]}>{task.title}</span>
              <span className={styles["task-status"]} data-status={task.status}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
