import { TaskList } from "../components/shared/TaskList";
import { useState } from "react";
import { getDashboardTasks } from "../helpers/task";
import { FilterSheet } from "../components/dashboard/FilterSheet";
import type { DashboardFilters } from "../types/dashboardFilters";
import { matchesDashboardFilters } from "../helpers/task/matchesDashboardFilters";
import { useTasksStore } from "../store/tasksStore";
import { DashboardHeader } from "../components/dashboard";
import { DashboardWidgets } from "../components/dashboard/DashboardWidgets";
import { TasksSearchBar } from "../components/shared/TasksSearchBar";

export const DashboardPage = () => {
  const tasks = useTasksStore((state) => state.tasks);

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<DashboardFilters>({
    status: "all",
    laboratory: null,
  });

  const dashboardTasks = getDashboardTasks(tasks);

  const filteredTasks = dashboardTasks.filter((task) =>
    matchesDashboardFilters({
      task,
      search,
      filters,
    }),
  );
  const hasActiveFilter =
    filters.status !== "all" || filters.laboratory !== null;
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-4">
        <section className="relative overflow-hidden pb-5 pt-4">
          <DashboardHeader />
          <DashboardWidgets />
          <TasksSearchBar
            search={search}
            onSearchChange={setSearch}
            hasActiveFilter={hasActiveFilter}
            onOpenFilters={() => setIsFilterOpen(true)}
          />
        </section>
      </div>
      <section className="mx-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-5 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TaskList tasks={filteredTasks} />
        </div>
        <FilterSheet
          isFilterOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </section>
    </div>
  );
};
