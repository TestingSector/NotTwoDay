import { Link } from "react-router-dom";
import { FolderKanban, Plus } from "lucide-react";
import { StatCard } from "./StatCard";
import { useTasksStore } from "../../store/tasksStore";
import { getTaskStats } from "../../helpers/task";

export const DashboardWidgets = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const { pendingCount, activeCount, urgentCount } = getTaskStats(tasks);
  const activeTasksCount = tasks.filter(
    (task) => task.status !== "completed",
  ).length;
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          value={pendingCount}
          label="Ожидание"
          borderColor="#3B82F680"
          backgroundColor="#3B82F670"
        />

        <StatCard
          value={activeCount}
          label="В работе"
          borderColor="#22C55E80"
          backgroundColor="#22C55E70"
        />

        <StatCard
          value={urgentCount}
          label="Срочно"
          borderColor="#F59E0B80"
          backgroundColor="#F59E0B70"
        />

        <Link
          to="/create-application"
          className="flex h-[64px] items-center justify-center rounded-[18px] bg-[var(--color-accent)]"
        >
          <Plus size={24} className="text-white" />
        </Link>
      </div>

      <Link
        to="/my-tasks"
        className="rounded-[24px] bg-[var(--color-shell-card)] p-4"
      >
        <div className="flex items-center justify-between">
          <FolderKanban size={20} className="text-white/80" />

          <span className="text-xs text-white/50">активные</span>
        </div>

        <p className="mt-2 text-4xl font-semibold leading-none text-white">
          {activeTasksCount}
        </p>

        <p className="mt-2 text-sm text-white/70">Мои задачи</p>
      </Link>
    </div>
  );
};
