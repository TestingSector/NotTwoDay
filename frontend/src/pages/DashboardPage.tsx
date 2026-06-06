import { TasksOverview } from "../components/dashboard/TasksOverview";
import { TaskList } from "../components/shared/TaskList";
import { useState, useEffect } from "react";
import { currentUser } from "../data/user/currentUser";
import {
  getDashboardTasks,
  getTaskStats,
  matchesTaskFilter,
} from "../helpers/task";
import { getTasks } from "../api";
import { FilterSheet } from "../components/dashboard";
import type { TaskStatusFilter } from "../types/taskStatusFilter";
import type { Task } from "../types/task";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("all");

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data);
    });
  }, []);

  const dashboardTasks = getDashboardTasks(tasks, currentUser);

  const { pendingCount, activeCount, urgentCount } =
    getTaskStats(dashboardTasks);

  const filteredTasks = dashboardTasks.filter((task) =>
    matchesTaskFilter({
      task,
      search,
      statusFilter,
    }),
  );

  const handleOpenFilters = () => {
    setIsFilterOpen(true);
  };
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-4">
        <TasksOverview
          user={currentUser}
          totalTasks={dashboardTasks.length}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onOpenFilters={handleOpenFilters}
          pendingCount={pendingCount}
          activeCount={activeCount}
          urgentCount={urgentCount}
        />
      </div>

      <section className="mx-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-5 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TaskList tasks={filteredTasks} />
        </div>
        {isFilterOpen && (
          <FilterSheet
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        )}
      </section>
    </div>
  );
};
