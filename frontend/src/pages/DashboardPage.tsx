import { TaskList } from "../components/shared/TaskList";
import { useEffect, useState } from "react";
import { getDashboardTasks } from "../helpers/task";
import { matchesTaskFilter } from "../helpers/task/matchesTaskFilter";
import { useTasksStore } from "../store/tasksStore";
import { DashboardHeader } from "../components/dashboard";
import { DashboardWidgets } from "../components/dashboard/DashboardWidgets";
import { TasksSearchBar } from "../components/shared/TasksSearchBar";
import { useAppStore } from "../store/appStore";
import { TaskFilters } from "../components/shared/TaskFilters";

export const DashboardPage = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const statusFilter = useAppStore((state) => state.statusFilter);
  const dateFilter = useAppStore((state) => state.dateFilter);

  const setStatusFilter = useAppStore((state) => state.setStatusFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);

  useEffect(() => {
    setStatusFilter("all");
    setDateFilter("all");
  }, [setStatusFilter, setDateFilter]);
  const [search, setSearch] = useState("");
  const dashboardTasks = getDashboardTasks(tasks);

  const filteredTasks = dashboardTasks.filter((task) =>
    matchesTaskFilter({
      task,
      search,
      statusFilter,
      dateFilter,
    }),
  );

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-4">
        <section className="relative overflow-hidden pb-5 pt-4">
          <DashboardHeader />
          <DashboardWidgets />
          <TasksSearchBar search={search} onSearchChange={setSearch} />
        </section>
      </div>
      <section className="mx-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-5 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TaskFilters showDate={true} showStatus={true} />
          <TaskList tasks={filteredTasks} />
        </div>
      </section>
    </div>
  );
};
