import type { Task } from "../../types/task";
import { sortTasks } from "./sortTask";

export const getDashboardTasks = (tasks: Task[]) => {
  return sortTasks(tasks.filter((task) => task.status !== "completed"));
};
