import type { Task } from "../../types/task";
import type { User } from "../../types/user";
import { sortTasks } from "./sortTask";

export const getMyTasks = (tasks: Task[], user: User) => {
  if (user.role === "customer") {
    return sortTasks(tasks.filter((task) => task.creator.id === user.id));
  }

  if (user.role === "engineer") {
    return sortTasks(
      tasks.filter(
        (task) =>
          task.executor?.id === user.id || (task.isUrgent && !task.executor),
      ),
    );
  }

  if (user.role === "dispatcher") {
    return sortTasks(tasks.filter((task) => task.isUrgent && !task.executor));
  }

  return sortTasks(tasks);
};
