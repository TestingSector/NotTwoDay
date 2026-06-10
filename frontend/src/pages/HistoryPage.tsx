import { useEffect, useState } from "react";
import { acceptTask, completeTask, getTasks } from "../api";
import { TasksView } from "../components/shared/TasksView";
import type { Task } from "../types/task";
import { matchesHistoryFilters } from "../helpers/task/matchesHistoryFilters";
import type { HistoryFilters } from "../types/historyFilters";
import { HistoryFilterSheet } from "../components/history/HistoryFilterSheet";

export const HistoryPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<HistoryFilters>({
    period: "all",
    executor: null,
    creator: null,
    method: null,
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const loadTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAcceptTask = async (taskId: string, executorId: string) => {
    await acceptTask(taskId, executorId);

    await loadTasks();
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId);

    await loadTasks();
  };
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
        onAcceptTask={handleAcceptTask}
        onCompleteTask={handleCompleteTask}
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
