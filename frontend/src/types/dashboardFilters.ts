import type { TaskStatusFilter } from "./taskStatusFilter";

export type DashboardFilters = {
  status: TaskStatusFilter;
  laboratory: string | null;
};
