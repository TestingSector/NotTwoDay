import type { DashboardFilters } from "../../types/dashboardFilters";
import type { Task } from "../../types/task";
import { getShortName } from "../user";

interface DashboardFilterParams {
  task: Task;
  search: string;
  filters: DashboardFilters;
}

export const matchesDashboardFilters = ({
  task,
  search,
  filters,
}: DashboardFilterParams) => {
  const searchValue = search.trim().toLowerCase();

  const creator = task.creator != null ? getShortName(task.creator) : "";

  const executor = task.executor != null ? getShortName(task.executor) : "";

  const matchesSearch =
    searchValue === "" ||
    task.number?.toLowerCase().includes(searchValue) ||
    task.materialName?.toLowerCase().includes(searchValue) ||
    task.testMethod?.toLowerCase().includes(searchValue) ||
    task.topic?.toLowerCase().includes(searchValue) ||
    task.standard?.toLowerCase().includes(searchValue) ||
    creator.toLowerCase().includes(searchValue) ||
    executor.toLowerCase().includes(searchValue);

  const matchesStatus =
    filters.status === "all"
      ? true
      : filters.status === "urgent"
        ? task.isUrgent && task.status === "pending"
        : task.status === filters.status;

  const matchesLaboratory =
    filters.laboratory === null
      ? true
      : task.creator.laboratory === filters.laboratory;

  return matchesSearch && matchesStatus && matchesLaboratory;
};
