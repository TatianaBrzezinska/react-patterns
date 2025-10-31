import { useTasksFilters } from "../model/use-tasks-filters";
import { useTaskTrack } from "../model/use-task-track";
import { TaskListLayout } from "./task-list-layout";
import { TaskTracking } from "./task-tracking";
import { NewTaskForm } from "./new-task-form";
import { TaskFilters } from "./task-filters";
import { TaskItem } from "./task-item";
import { useNewTask } from "../model/use-new-task";
import { useTasks } from "../model/use-tasks";
import { useTasksDnd } from "../model/use-tasks-dnd";
import { globalEventEmmiter } from "@/kernel/events";
import React from "react";

export const TaskList: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleDone, reorderTasks } = useTasks();
  const { filteredTasks, filters } = useTasksFilters({
    tasks,
  });
  const { handleAddTask, handleTaskTitleInputChange, newTaskTitle } =
    useNewTask({ onAddTask: addTask });

  const {
    activeTask,
    currentTrackingTime,
    startTracking,
    stopTracking,
    tracking,
  } = useTaskTrack({
    onTrack: ({ hours, task, startAt }) => {
      globalEventEmmiter.emit("createTrackWithParams", {
        day: startAt.getDate(),
        selectedMonth: startAt.getMonth(),
        selectedYear: startAt.getFullYear(),
        task: task.title,
        hours,
      });
    },
    tasks,
  });

  const getTasksDnd = useTasksDnd({
    tasks,
    onReorder: reorderTasks,
  });

  return (
    <TaskListLayout
      actions={
        <>
          <TaskTracking
            currentTrackingTime={currentTrackingTime}
            activeTask={activeTask}
            onStopTracking={stopTracking}
          />

          <NewTaskForm
            newTaskTitle={newTaskTitle}
            onSubmit={handleAddTask}
            onChange={handleTaskTitleInputChange}
          />

          <TaskFilters
            filterStatus={filters.filterStatus}
            onFilterChange={filters.setFilterStatus}
          />
        </>
      }
      list={filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isTracking={task.id === tracking.activeTaskId}
          trackingStartTime={tracking.startTime}
          canStartTracking={!tracking.activeTaskId}
          onToggleDone={toggleDone}
          onStartTracking={startTracking}
          onDeleteTask={deleteTask}
          dnd={getTasksDnd(task)}
        />
      ))}
    />
  );
};
