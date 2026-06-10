import { useEffect, useState } from "react";
import { acceptTask, completeTask, getTasks } from "../api";
import { TasksView } from "../components/shared/TasksView";
import type { Task } from "../types/task";
import { matchesHistoryFilters } from "../helpers/task/matchesHistoryFilters";
import type { HistoryFilters } from "../types/historyFilters";
import { HistoryFilterSheet } from "../components/history/HistoryFilterSheet";
import { useTasksStore } from "../store/tasksStore";

export const HistoryPage = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<HistoryFilters>({
    period: "all",
    executor: null,
    creator: null,
    method: null,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const historyTasks = tasks.filter((task) => task.status === "completed");

  const filteredTasks = historyTasks.filter((task) =>
    matchesHistoryFilters({
      task,
      search,
      filters,
    }),
  );
  return (
    <>
      <TasksView
        title="История"
        subtitle={`Завершённых испытаний: ${historyTasks.length}.`}
        tasks={filteredTasks}
        search={search}
        onSearchChange={setSearch}
        hasActiveFilter={
          filters.period !== "all" ||
          filters.executor !== null ||
          filters.creator !== null ||
          filters.method !== null
        }
        onOpenFilters={() => setIsFilterOpen(true)}
      />
      <HistoryFilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </>
  );
};
