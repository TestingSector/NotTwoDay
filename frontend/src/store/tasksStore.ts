import { create } from "zustand";
import {
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  acceptTask as acceptTaskApi,
  completeTask as completeTaskApi,
  getTasks as getTasksApi,
} from "../api";
import type { Task } from "../types/task";
import type { TaskPayload } from "../types/taskPayload";
import { devtools } from "zustand/middleware";
type TasksStore = {
  tasks: Task[];
  isLoaded: boolean;

  loadTasks: () => Promise<void>;

  acceptTask: (taskId: string, executorId: string) => Promise<void>;

  completeTask: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, data: TaskPayload) => Promise<void>;
  createTask: (payload: TaskPayload) => Promise<void>;
  refreshTasks: () => Promise<void>;
};

export const useTasksStore = create<TasksStore>()(
  devtools(
    (set, get) => ({
      tasks: [],
      isLoaded: false,

      refreshTasks: async () => {
        const tasks = await getTasksApi();

        set({ tasks });
      },
      loadTasks: async () => {
        const tasks = await getTasksApi();

        set({
          tasks,
          isLoaded: true,
        });
      },

      acceptTask: async (taskId, executorId) => {
        await acceptTaskApi(taskId, executorId);

        await get().refreshTasks();
      },

      completeTask: async (taskId) => {
        await completeTaskApi(taskId);

        await get().refreshTasks();
      },
      deleteTask: async (taskId) => {
        await deleteTaskApi(taskId);

        await get().refreshTasks();
      },

      updateTask: async (taskId, payload) => {
        await updateTaskApi(taskId, payload);

        await get().refreshTasks();
      },
      createTask: async (payload) => {
        await createTaskApi(payload);
        await get().refreshTasks();
      },
    }),
    {
      name: "TasksStore",
    },
  ),
);
