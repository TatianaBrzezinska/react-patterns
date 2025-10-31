import { useTasksFilters } from "../hooks/use-tasks-filters";
import { useTaskTrack } from "../hooks/use-task-track";
import { TaskListLayout } from "./task-list-layout";
import { TaskTracking } from "./task-tracking";
import { NewTaskForm } from "./new-task-form";
import { TaskFilters } from "./task-filters";
import { TaskItem } from "./task-item";
import { useNewTask } from "../hooks/use-new-task";
import { useTasks } from "../hooks/use-tasks";
import { globalEventEmmiter } from "@/interfaces/event-emmiter";

export const TaskList: React.FC = () => {
  const { tasks, addTask, deleteTask, toggleDone } = useTasks();
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
      globalEventEmmiter.emit("cellClick", {
        day: startAt.getDate(),
        selectedMonth: startAt.getMonth(),
        selectedYear: startAt.getFullYear(),
        task: task.title,
        hours,
      });
    },
    tasks,
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
      list={filteredTasks.reverse().map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isTracking={task.id === tracking.activeTaskId}
          trackingStartTime={tracking.startTime}
          canStartTracking={!tracking.activeTaskId}
          onToggleDone={toggleDone}
          onStartTracking={startTracking}
          onDeleteTask={deleteTask}
        />
      ))}
    />
  );
};
