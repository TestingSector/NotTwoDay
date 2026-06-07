import type { Task } from "../../types/task";

export const getPrimaryTaskAction = (task: Task) => {
  switch (task.status) {
    case "pending":
      return "accept";

    case "active":
      return "complete";

    default:
      return null;
  }
};
