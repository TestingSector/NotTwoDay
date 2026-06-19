import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { canViewMyTasks } from "../helpers/permissions";
import { useCurrentUser } from "../helpers/useCurrentUser";
import { getMyTasks } from "../helpers/task";
import { TasksView } from "../components/shared/TasksView";
import { useTasksStore } from "../store/tasksStore";
import { useAppStore } from "../store/appStore";
import { matchesTaskFilter } from "../helpers/task/matchesTaskFilter";

export const MyTasksPage = () => {
  const user = useCurrentUser();
  const tasks = useTasksStore((state) => state.tasks);
  const statusFilter = useAppStore((state) => state.statusFilter);
  const dateFilter = useAppStore((state) => state.dateFilter);
  const setStatusFilter = useAppStore((state) => state.setStatusFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setStatusFilter("all");
    setDateFilter("all");
  }, [setStatusFilter, setDateFilter]);
  if (!canViewMyTasks(user.role)) {
    return <Navigate to="/" replace />;
  }
  const myTasks = getMyTasks(tasks, user);

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
