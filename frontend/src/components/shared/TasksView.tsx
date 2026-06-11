import { TaskList } from "./TaskList";
import type { Task } from "../../types/task";
import { TasksSearchBar } from "./TasksSearchBar";
import { TaskFilters } from "./TaskFilters";

type TasksViewProps = {
  title: string;
  subtitle: string;

  tasks: Task[];

  search: string;
  onSearchChange: (value: string) => void;

  showStatusFilter?: boolean;
  showDateFilter?: boolean;
};

export const TasksView = ({
  title,
  subtitle,
  tasks,
  search,
  onSearchChange,
  showStatusFilter = false,
  showDateFilter = false,
}: TasksViewProps) => {
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pb-8 pt-14">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm font-medium text-white/70">{subtitle}</p>
        <TasksSearchBar search={search} onSearchChange={onSearchChange} />
      </header>

      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)]">
        <section className="flex flex-col px-4 pb-28 pt-6">
          <TaskFilters
            showStatus={showStatusFilter}
            showDate={showDateFilter}
          />
          <TaskList tasks={tasks} />
        </section>
      </main>
    </div>
  );
};
