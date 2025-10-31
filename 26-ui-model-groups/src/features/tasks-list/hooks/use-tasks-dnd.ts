import { useState, useCallback } from "react";
import { Task } from "./use-tasks";

interface UseTasksDndProps {
  tasks: Task[];
  onReorder: (fromIndex: number, toIndex: number) => Promise<void>;
}

export type DragState = "dragging" | "dragover" | undefined;

export type DragAndDropProps = {
  state: DragState;
  onDragStart: React.DragEventHandler;
  onDragOver: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onDragEnd: React.DragEventHandler;
};

export function useTasksDnd({
  tasks,
  onReorder,
}: UseTasksDndProps): (task: Task) => DragAndDropProps {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const getDragItemStyle = useCallback(
    (task: Task): DragState => {
      if (draggedTask?.id === task.id) return "dragging";
      if (draggedOverIndex === tasks.findIndex((t) => t.id === task.id)) {
        return "dragover";
      }
      return undefined;
    },
    [draggedTask, draggedOverIndex, tasks]
  );

  const handleDragStart = useCallback(
    (task: Task) => () => {
      setDraggedTask(task);
    },
    []
  );

  const handleDragOver = useCallback(
    (task: Task) => (e: React.DragEvent) => {
      e.preventDefault();
      const index = tasks.findIndex((t) => t.id === task.id);
      setDraggedOverIndex(index);
    },
    [tasks]
  );

  const handleDrop = useCallback(async () => {
    if (!draggedTask || draggedOverIndex === null) return;

    const fromIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    if (fromIndex === -1 || fromIndex === draggedOverIndex) return;

    await onReorder(fromIndex, draggedOverIndex);

    // Reset drag state
    setDraggedTask(null);
    setDraggedOverIndex(null);
  }, [draggedTask, draggedOverIndex, tasks, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
    setDraggedOverIndex(null);
  }, []);

  return useCallback(
    (task: Task): DragAndDropProps => ({
      state: getDragItemStyle(task),
      onDragStart: handleDragStart(task),
      onDragOver: handleDragOver(task),
      onDrop: handleDrop,
      onDragEnd: handleDragEnd,
    }),
    [
      getDragItemStyle,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
    ]
  );
}
