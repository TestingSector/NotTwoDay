import { TasksOverview } from "../widgets/TasksOverview";
import { TestCard } from "../widgets/TestCard";
import { tasks } from "../shared/mocks/tasks";
import { currentUser }
  from "../shared/mocks/currentUser";

import { getDashboardTasks }
  from "../shared/lib/tasks";

export const DashboardPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-6">
        <TasksOverview />
      </div>

      <section className="mx-4 mt-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-6 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          {getDashboardTasks(tasks, currentUser).map((task, index) => (
              <TestCard
                key={task.id}
                task={task}
                isFirst={index === 0}
              />
          ))}
        </div>
      </section>
    </div>
  );
};