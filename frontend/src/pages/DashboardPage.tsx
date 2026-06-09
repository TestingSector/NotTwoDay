import { TasksOverview } from "../components/dashboard/TasksOverview";
import { TaskList } from "../components/shared/TaskList";
import { useState, useEffect } from "react";
import { currentUser } from "../data/user/currentUser";
import { getDashboardTasks, getTaskStats } from "../helpers/task";
import { acceptTask, completeTask, getTasks } from "../api";
import { FilterSheet } from "../components/dashboard/FilterSheet";
import type { Task } from "../types/task";
import type { DashboardFilters } from "../types/dashboardFilters";
import { matchesDashboardFilters } from "../helpers/task/matchesDashboardFilters";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<DashboardFilters>({
    status: "all",
    laboratory: null,
  });
  const loadTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  const dashboardTasks = getDashboardTasks(tasks, currentUser);

  const { pendingCount, activeCount, urgentCount } =
    getTaskStats(dashboardTasks);

  const filteredTasks = dashboardTasks.filter((task) =>
    matchesDashboardFilters({
      task,
      search,
      filters,
    }),
  );

  const handleOpenFilters = () => {
    setIsFilterOpen(true);
  };
  const handleAcceptTask = async (taskId: string, executorId: string) => {
    try {
      await acceptTask(taskId, executorId);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-4">
        <TasksOverview
          user={currentUser}
          totalTasks={dashboardTasks.length}
          search={search}
          onSearchChange={setSearch}
          hasActiveFilter={
            filters.status !== "all" || filters.laboratory !== null
          }
          onOpenFilters={handleOpenFilters}
          pendingCount={pendingCount}
          activeCount={activeCount}
          urgentCount={urgentCount}
        />
      </div>

      <section className="mx-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-5 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TaskList
            tasks={filteredTasks}
            onAcceptTask={handleAcceptTask}
            onCompleteTask={handleCompleteTask}
          />
        </div>
        <FilterSheet
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </section>
    </div>
  );
};
