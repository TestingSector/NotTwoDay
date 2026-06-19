import type { Task } from "../../types/task";
import type { User } from "../../types/user";
import { sortTasks } from "./sortTask";

export const getMyTasks = (tasks: Task[], user: User) => {
  if (user.role === "developer" || user.role === "admin") {
    return sortTasks(tasks.filter((task) => task.creator.id === user.id));
  }

  if (user.role === "tester") {
    return sortTasks(
      tasks.filter(
        (task) =>
          task.executor?.id === user.id || (task.isUrgent && !task.executor),
      ),
    );
  }

  return [];
};
