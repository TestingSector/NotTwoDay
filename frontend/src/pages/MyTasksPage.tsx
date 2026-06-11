import { useEffect, useState } from "react";
import { currentUser } from "../data/user/currentUser";
import { getMyTasks } from "../helpers/task";
import { TasksView } from "../components/shared/TasksView";
import { useTasksStore } from "../store/tasksStore";
import { useAppStore } from "../store/appStore";
import { matchesTaskFilter } from "../helpers/task/matchesTaskFilter";

export const MyTasksPage = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const statusFilter = useAppStore((state) => state.statusFilter);
  const dateFilter = useAppStore((state) => state.dateFilter);
  const setStatusFilter = useAppStore((state) => state.setStatusFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);
  useEffect(() => {
    setStatusFilter("all");
    setDateFilter("all");
  }, [setStatusFilter, setDateFilter]);

  const myTasks = getMyTasks(tasks, currentUser);
  const [search, setSearch] = useState("");
  const filteredTasks = myTasks.filter((task) =>
    matchesTaskFilter({
      task,
      search,
      statusFilter,
      dateFilter,
    }),
  );
  return (
    <TasksView
      title="Мои задачи"
      subtitle={`${myTasks.length} активных задач`}
      tasks={filteredTasks}
      search={search}
      onSearchChange={setSearch}
      showDateFilter={true}
      showStatusFilter={true}
    />
  );
};
