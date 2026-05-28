import type { Task } from "../types/task";

const getTaskPriority = (
  task: Task,
) => {
  /*
    0 = highest priority
  */

  if (
    task.status === "active"
  ) {
    return 0;
  }

  if (task.isUrgent) {
    return 1;
  }

  if (
    task.status === "completed"
  ) {
    return 3;
  }

  return 2;
};

export const sortTasks = (
  tasks: Task[],
) => {
  return [...tasks].sort(
    (a, b) => {
      const priorityA =
        getTaskPriority(a);

      const priorityB =
        getTaskPriority(b);

      /*
        1. Priority groups
      */

      if (
        priorityA !== priorityB
      ) {
        return (
          priorityA -
          priorityB
        );
      }

      /*
        2. Newest first
      */

      return (
        b.createdAt -
        a.createdAt
      );
    },
  );
};