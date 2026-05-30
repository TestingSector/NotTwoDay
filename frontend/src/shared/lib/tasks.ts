import type { Task } from "../types/task";

import type { User } from "../types/user";

const getTaskPriority = (task: Task) => {
  if (task.status === "active") {
    return 0;
  }

  if (task.isUrgent) {
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
