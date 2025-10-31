type TaskDto = {
  id: string;
  title: string;
  isDone: boolean;
  order: number;
};

export interface TaskTrackingDto {
  activeTaskId: string | null;
  startTime: string | null;
}

export const tasksListApi = {
  fetchTasks: async () => {
    const response = await fetch("http://localhost:3001/tasks?_sort=order");
    return response.json();
  },
  addTask: async (title: string, order: number) => {
    const response = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, isDone: false, order }),
    });
    return response.json();
  },
  deleteTask: async (id: string) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
  },
  updateTask: async (task: TaskDto) => {
    const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return response.json();
  },
  reorderTasks: async (tasks: TaskDto[]) => {
    const updates = tasks.map((task, index) =>
      fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: index }),
      })
    );
    await Promise.all(updates);
  },
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace taskTrackingApi {
  export const fetchTracking = async (): Promise<TaskTrackingDto> => {
    const response = await fetch("http://localhost:3001/taskTracking");
    return response.json();
  };

  export const updateTracking = async (
    newTracking: TaskTrackingDto
  ): Promise<TaskTrackingDto> => {
    const response = await fetch("http://localhost:3001/taskTracking", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTracking),
    });
    return response.json();
  };
}
