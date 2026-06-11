import { useEffect, useState } from "react";
import { TasksView } from "../components/shared/TasksView";
import { useTasksStore } from "../store/tasksStore";
import { matchesTaskFilter } from "../helpers/task/matchesTaskFilter";
import { useAppStore } from "../store/appStore";

export const HistoryPage = () => {
  const tasks = useTasksStore((state) => state.tasks);

  const dateFilter = useAppStore((state) => state.dateFilter);
  const setStatusFilter = useAppStore((state) => state.setStatusFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);

  useEffect(() => {
    setStatusFilter("all");
    setDateFilter("all");
  }, [setStatusFilter, setDateFilter]);

  const [search, setSearch] = useState("");
  const historyTasks = tasks.filter((task) => task.status === "completed");

  const filteredTasks = historyTasks.filter((task) =>
    matchesTaskFilter({
      task,
      search,
      statusFilter: "all",
      dateFilter,
    }),
  );
  return (
    <TasksView
      title="История"
      subtitle={`Завершённых испытаний: ${historyTasks.length}.`}
      tasks={filteredTasks}
      search={search}
      onSearchChange={setSearch}
      showDateFilter={true}
    />
  );
};
