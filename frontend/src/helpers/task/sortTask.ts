import type { Task } from "../../types/task";

const getTaskPriority = (task: Task) => {
  if (task.status === "active") {
    return 0;
  }

  if (task.isUrgent && task.status === "pending") {
    return 1;
  }

  if (task.status === "completed") {
    return 3;
  }

  return 2;
};

export const sortTasks = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    const priorityA = getTaskPriority(a);

    const priorityB = getTaskPriority(b);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
