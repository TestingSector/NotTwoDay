import type { Task } from "../../types/task";
import type { TaskStatusFilter } from "../../types/taskStatusFilter";
import { getShortName } from "../user";

interface FilterParams {
  task: Task;
  search: string;
  statusFilter: TaskStatusFilter;
}

export const matchesTaskFilter = ({
  task,
  search,
  statusFilter,
}: FilterParams) => {
  const searchValue = search.toLowerCase();

  const creator =
    task.creator != null ? getShortName(task.creator) : "";

  const executor =
    task.executor != null ? getShortName(task.executor) : "";

  const matchesSearch =
    task.number?.toLowerCase().includes(searchValue) ||
    task.materialName?.toLowerCase().includes(searchValue) ||
    task.testMethod?.toLowerCase().includes(searchValue) ||
    task.topic?.toLowerCase().includes(searchValue) ||
    task.standard?.toLowerCase().includes(searchValue) ||
    creator.toLowerCase().includes(searchValue) ||
    executor.toLowerCase().includes(searchValue);

  const matchesStatus =
    statusFilter === "all"
      ? true
      : statusFilter === "urgent"
        ? task.isUrgent
        : task.status === statusFilter;

  return matchesSearch && matchesStatus;
};