import { useState } from "react";
import { currentUser } from "../data/user/currentUser";
import { getMyTasks, matchesTaskFilter } from "../helpers/task";
import { TasksView } from "../components/shared/TasksView";
import { useTasksStore } from "../store/tasksStore";

export const MyTasksPage = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const acceptTaskStore = useTasksStore((state) => state.acceptTask);
  const completeTaskStore = useTasksStore((state) => state.completeTask);

  const [search, setSearch] = useState("");

  const handleAcceptTask = async (taskId: string, executorId: string) => {
    await acceptTaskStore(taskId, executorId);
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTaskStore(taskId);
  };

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
      onAcceptTask={handleAcceptTask}
      onCompleteTask={handleCompleteTask}
      search={search}
      onSearchChange={setSearch}
      hasActiveFilter={false}
      onOpenFilters={() => {}}
    />
  );
};
