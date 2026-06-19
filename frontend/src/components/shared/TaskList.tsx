import { TestCard } from "./TestCard";
import type { Task } from "../../types/task";
import { useState } from "react";
import { TaskDetailsSheet } from "../../pages/TaskDetailsSheet";
import { useCurrentUser } from "../../helpers/useCurrentUser";
import { canViewTaskDetails } from "../../helpers/permissions";
import { toast } from "sonner";
type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  const user = useCurrentUser();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenTaskDetails = (task: Task) => {
    if (!canViewTaskDetails(user.role)) {
      toast.warning("Просмотр заявок недоступен");
      return;
    }

    setSelectedTask(task);
  };
  return (
    <>
      {tasks.map((task, index) => (
        <TestCard
          key={task.id}
          task={task}
          isFirst={index === 0}
          onClick={() => handleOpenTaskDetails(task)}
        />
      ))}
      <TaskDetailsSheet
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </>
  );
};
