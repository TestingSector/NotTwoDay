import type { Task } from "../../types/task";

export const getTaskStats = (tasks: Task[]) => {
  return {
    pendingCount: tasks.filter((task) => task.status === "pending").length,

    activeCount: tasks.filter((task) => task.status === "active").length,

    urgentCount: tasks.filter((task) => task.isUrgent).length,
  };
};