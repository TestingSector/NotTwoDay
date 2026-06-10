import { TasksOverview } from "../components/dashboard/TasksOverview";
import { TaskList } from "../components/shared/TaskList";
import { useState } from "react";
import { currentUser } from "../data/user/currentUser";
import { getDashboardTasks, getTaskStats } from "../helpers/task";
import { FilterSheet } from "../components/dashboard/FilterSheet";
import type { DashboardFilters } from "../types/dashboardFilters";
import { matchesDashboardFilters } from "../helpers/task/matchesDashboardFilters";
import { useTasksStore } from "../store/tasksStore";

export const DashboardPage = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const acceptTaskStore = useTasksStore((state) => state.acceptTask);
  const completeTaskStore = useTasksStore((state) => state.completeTask);

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState<DashboardFilters>({
    status: "all",
    laboratory: null,
  });

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
      await acceptTaskStore(taskId, executorId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTaskStore(taskId);
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
