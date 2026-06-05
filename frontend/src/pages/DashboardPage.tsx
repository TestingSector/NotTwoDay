import { TasksOverview } from "../components/dashboard/TasksOverview";
import { TaskList } from "../components/shared/TaskList";
import { useState, useEffect } from "react";
import { currentUser } from "../data/user/currentUser";
import { getDashboardTasks } from "../helpers/task";
import { getTasks } from "../api";
import { getShortName } from "../helpers/user";
import { BottomSheet } from "../ui";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState<
    "all" | "urgent" | "pending" | "active"
  >("all");
  const filterOptions = [
    {
      status: "all",
      label: "Все задачи",
    },
    {
      status: "pending",
      label: "Ожидают",
    },
    {
      status: "active",
      label: "В работе",
    },
    {
      status: "urgent",
      label: "Срочные",
    },
  ] as const;
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const dashboardTasks = getDashboardTasks(tasks, currentUser);
  const pendingCount = dashboardTasks.filter(
    (task) => task.status === "pending",
  ).length;

  const activeCount = dashboardTasks.filter(
    (task) => task.status === "active",
  ).length;

  const urgentCount = dashboardTasks.filter((task) => task.isUrgent).length;
  const filteredTasks = dashboardTasks.filter((task) => {
    const searchValue = search.toLowerCase();
    const creator = task.creator != null ? getShortName(task.creator) : "";

    const executor = task.executor != null ? getShortName(task.executor) : "";
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
  });

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-4">
        <TasksOverview
          user={currentUser}
          totalTasks={dashboardTasks.length}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onOpenFilters={() => setIsFilterOpen(true)}
          pendingCount={pendingCount}
          activeCount={activeCount}
          urgentCount={urgentCount}
        />
      </div>

      <section className="mx-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-5 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          <TaskList tasks={filteredTasks} />
          {isFilterOpen && (
            <BottomSheet
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              title="Фильтр задач"
              subtitle="Выберите отображаемые задачи"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.status}
                  onClick={() => {
                    setStatusFilter(filter.status as typeof statusFilter);
                    setIsFilterOpen(false);
                  }}
                  className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
                    statusFilter === filter.status
                      ? "bg-[var(--color-shell)] text-white"
                      : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                  } `}
                >
                  {filter.label}
                </button>
              ))}
            </BottomSheet>
          )}
        </div>
      </section>
    </div>
  );
};
