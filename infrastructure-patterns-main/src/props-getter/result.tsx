import { useState } from "react";
import styles from "./example.module.css";
import clsx from "clsx";

export function useDraggableList<T>({
  list,
  getId,
  onChangeOrder,
}: {
  list: T[];
  getId: (item: T) => number | string;
  onChangeOrder: (newOrder: T[]) => void;
}) {
  const [dragState, setDragState] = useState<{
    draggedId: number | string | null;
    draggedOverId: number | string | null;
  }>({
    draggedId: null,
    draggedOverId: null,
  });

  const handleDragStart = (item: T) => (e: React.DragEvent) => {
    // Required for Firefox
    e.dataTransfer.setData("text/plain", "");
    e.dataTransfer.effectAllowed = "move";
    setDragState((prev) => ({
      ...prev,
      draggedId: getId(item),
    }));
  };

  const handleDragEnter = (item: T) => (e: React.DragEvent) => {
    e.preventDefault();
    if (getId(item) !== dragState.draggedId) {
      setDragState((prev) => ({
        ...prev,
        draggedOverId: getId(item),
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
      const draggedTask = list.find((task) => getId(task) === draggedId);
      const draggedOverTask = list.find(
        (task) => getId(task) === draggedOverId
      );

      if (draggedTask && draggedOverTask) {
        const newTasks = [...list];
        const draggedIdx = newTasks.indexOf(draggedTask);
        const draggedOverIdx = newTasks.indexOf(draggedOverTask);

        // Remove dragged item and insert at new position
        newTasks.splice(draggedIdx, 1);
        newTasks.splice(draggedOverIdx, 0, draggedTask);

        onChangeOrder(newTasks);
      }
    }

    setDragState({
      draggedId: null,
      draggedOverId: null,
    });
  };
  return {
    getItemProps: (item: T, { className }: { className?: string } = {}) => ({
      draggable: true,
      className: clsx(className, styles["dnd-item"]),
      onDragStart: handleDragStart(item),
      onDragEnter: handleDragEnter(item),
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      "data-dragged": getId(item) === dragState.draggedId,
      "data-dragged-over": getId(item) === dragState.draggedOverId,
    }),
    getContainerProps: ({ className }: { className?: string } = {}) => ({
      className: clsx(className, styles["dnd-container"]),
    }),
  };
}

interface Task {
  id: number;
  title: string;
  status: "todo" | "done";
}

interface User {
  id: number;
  name: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", status: "done" },
    { id: 2, title: "Build an app", status: "todo" },
    { id: 3, title: "Write tests", status: "todo" },
    { id: 4, title: "Deploy to production", status: "todo" },
    { id: 5, title: "Add documentation", status: "todo" },
  ]);

  const { getContainerProps, getItemProps } = useDraggableList({
    list: tasks,
    getId: (task) => task.id,
    onChangeOrder: setTasks,
  });

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Bob Smith" },
  ]);

  const { getContainerProps: getContainerProps2, getItemProps: getItemProps2 } =
    useDraggableList({
      list: users,
      getId: (user) => user.id,
      onChangeOrder: setUsers,
    });

  return (
    <div className={styles.container}>
      <div {...getContainerProps()}>
        {tasks.map((task) => (
          <div
            key={task.id}
            {...getItemProps(task, {
              className: styles.task,
            })}
          >
            <span className={styles["task-title"]}>{task.title}</span>
            <span className={styles["task-status"]} data-status={task.status}>
              {task.status}
            </span>
          </div>
        ))}
      </div>

      <div {...getContainerProps2()}>
        {users.map((user) => (
          <div
            key={user.id}
            {...getItemProps2(user, {
              className: styles.user,
            })}
          >
            <span className={styles["user-name"]}> @ {user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
