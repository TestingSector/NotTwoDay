import type { HistoryFilters } from "../../types/historyFilters";
import type { Task } from "../../types/task";
import { getShortName } from "../user";

interface HistoryFilterParams {
  task: Task;
  search: string;
  filters: HistoryFilters;
}

export const matchesHistoryFilters = ({
  task,
  search,
  filters,
}: HistoryFilterParams) => {
  const searchValue = search.trim().toLowerCase();

  const creator = task.creator != null ? getShortName(task.creator) : "";

  const executor = task.executor != null ? getShortName(task.executor) : "";

  const now = new Date();

  const completedDate = task.completedAt ? new Date(task.completedAt) : null;

  const matchesSearch =
    searchValue === "" ||
    task.number.toLowerCase().includes(searchValue) ||
    task.materialName.toLowerCase().includes(searchValue) ||
    task.testMethod.toLowerCase().includes(searchValue) ||
    task.standard.toLowerCase().includes(searchValue) ||
    creator.toLowerCase().includes(searchValue) ||
    executor.toLowerCase().includes(searchValue);
  const matchesPeriod =
    filters.period === "all"
      ? true
      : completedDate === null
        ? false
        : filters.period === "week"
          ? now.getTime() - completedDate.getTime() <= 7 * 24 * 60 * 60 * 1000
          : filters.period === "month"
            ? now.getTime() - completedDate.getTime() <=
              30 * 24 * 60 * 60 * 1000
            : now.getTime() - completedDate.getTime() <=
              365 * 24 * 60 * 60 * 1000;
  return matchesSearch && matchesPeriod;
};
