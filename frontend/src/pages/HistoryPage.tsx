import { useEffect, useState } from "react";
import { acceptTask, completeTask, getTasks } from "../api";
import { currentUser } from "../data/user/currentUser";
import { getMyTasks, matchesTaskFilter } from "../helpers/task";
import { TasksView } from "../components/shared/TasksView";
import type { Task } from "../types/task";

export const HistoryPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
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
    matchesTaskFilter({
      task,
      search,
      statusFilter: "all",
    }),
  );
  return (
    <TasksView
      title="Мои задачи"
      subtitle={`Выполненных испытаний: ${historyTasks.length}.`}
      tasks={filteredTasks}
      onAcceptTask={handleAcceptTask}
      onCompleteTask={handleCompleteTask}
      search={search}
      onSearchChange={setSearch}
      hasActiveFilter={false}
      onOpenFilters={() => {}}
    />
  );
};
