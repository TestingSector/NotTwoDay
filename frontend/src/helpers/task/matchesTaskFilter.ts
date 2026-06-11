import type { Task } from "../../types/task";
import type { DateFilter, StatusFilter } from "../../types/filters";
import { getShortName } from "../user";
import { matchesTaskDate } from "./matchesTaskDate";

interface FilterParams {
  task: Task;
  search: string;
  statusFilter: StatusFilter;
  dateFilter: DateFilter;
}

export const matchesTaskFilter = ({
  task,
  search,
  statusFilter,
  dateFilter,
}: FilterParams) => {
  const searchValue = search.trim().toLowerCase();

  const creator = task.creator != null ? getShortName(task.creator) : "";

  const executor = task.executor != null ? getShortName(task.executor) : "";

  const searchableFields = [
    task.number,
    task.materialName,
    task.testMethod,
    task.topic,
    task.standard,
    creator,
    executor,
  ];

  const matchesSearch =
    searchValue === "" ||
    searchableFields.some((field) =>
      field?.toLowerCase().includes(searchValue),
    );

  const matchesStatus =
    statusFilter === "all"
      ? true
      : statusFilter === "urgent"
        ? task.isUrgent && task.status === "pending"
        : task.status === statusFilter;
  const matchesDate = matchesTaskDate(task, dateFilter);

  return matchesSearch && matchesStatus && matchesDate;
};
