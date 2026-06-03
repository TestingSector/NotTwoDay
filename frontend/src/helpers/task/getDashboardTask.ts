import type { Task } from "../../types/task";
import type { User } from "../../types/user";
import { sortTasks } from "./sortTask";

export const getDashboardTasks = (tasks: Task[], user: User) => {
  if (user.role === "dispatcher" || user.role === "admin") {
    return sortTasks(tasks);
  }

  if (user.role === "customer") {
    return sortTasks(tasks.filter((task) => task.status !== "completed"));
  }

  if (user.role === "engineer") {
    return sortTasks(tasks);
  }

  return [];
};
