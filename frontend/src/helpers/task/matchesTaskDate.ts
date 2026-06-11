import type { DateFilter } from "../../types/filters";
import type { Task } from "../../types/task";

export const matchesTaskDate = (task: Task, dateFilter: DateFilter) => {
  if (dateFilter === "all") {
    return true;
  }

  const createdAt = new Date(task.createdAt);
  const now = new Date();

  if (dateFilter === "week") {
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return createdAt >= weekAgo;
  }

  if (dateFilter === "month") {
    const monthAgo = new Date();
    monthAgo.setMonth(now.getMonth() - 1);

    return createdAt >= monthAgo;
  }

  return true;
};
