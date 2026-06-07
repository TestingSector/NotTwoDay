import { TestCard } from "./TestCard";
import type { Task } from "../../types/task";
import { useState } from "react";
import { TaskDetailsSheet } from "../../pages/TaskDetailsSheet";

type TaskListProps = {
  tasks: Task[];
  onAcceptTask: (taskId: string, executorId: string) => Promise<void>;
  onCompleteTask: (taskId: string) => Promise<void>;
};

export const TaskList = ({
  tasks,
  onAcceptTask,
  onCompleteTask,
}: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  return (
    <>
      {tasks.map((task, index) => (
        <TestCard
          key={task.id}
          task={task}
          isFirst={index === 0}
          onClick={() => setSelectedTask(task)}
        />
      ))}
      <TaskDetailsSheet
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onAcceptTask={onAcceptTask}
        onCompleteTask={onCompleteTask}
      />
    </>
  );
};
