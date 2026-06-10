import { useState } from "react";
import { currentUser } from "../data/user/currentUser";
import { getMyTasks, matchesTaskFilter } from "../helpers/task";
import { TasksView } from "../components/shared/TasksView";
import { useTasksStore } from "../store/tasksStore";

export const MyTasksPage = () => {
  const tasks = useTasksStore((state) => state.tasks);

  const [search, setSearch] = useState("");

  const myTasks = getMyTasks(tasks, currentUser);
  const filteredTasks = myTasks.filter((task) =>
    matchesTaskFilter({
      task,
      search,
      statusFilter: "all",
    }),
  );
  return (
    <TasksView
      title="Мои задачи"
      subtitle={`${myTasks.length} активных задач`}
      tasks={filteredTasks}
      search={search}
      onSearchChange={setSearch}
      hasActiveFilter={false}
      onOpenFilters={() => {}}
    />
  );
};
