import { create } from "zustand";
import { acceptTask, completeTask, getTasks } from "../api";
import type { Task } from "../types/task";

type TasksStore = {
  tasks: Task[];
  isLoaded: boolean;

  loadTasks: () => Promise<void>;

  acceptTask: (taskId: string, executorId: string) => Promise<void>;

  completeTask: (taskId: string) => Promise<void>;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  isLoaded: false,

  loadTasks: async () => {
    const tasks = await getTasks();

    set({
      tasks,
      isLoaded: true,
    });
  },

  acceptTask: async (taskId, executorId) => {
    await acceptTask(taskId, executorId);

    const tasks = await getTasks();

    set({ tasks });
  },

  completeTask: async (taskId) => {
    await completeTask(taskId);

    const tasks = await getTasks();

    set({ tasks });
  },
}));
