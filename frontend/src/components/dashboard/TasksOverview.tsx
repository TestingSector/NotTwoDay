import { Link } from "react-router-dom";
import { Plus, FolderKanban } from "lucide-react";
import type { User } from "../../types/user";
import { StatCard } from "./StatCard";
import { TaskSearch } from "./TaskSearch";
import { DashboardHeader } from "./DashboardHeader";

type TasksOverviewProps = {
  user: User;
  totalTasks: number;
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "urgent" | "pending" | "active";
  onOpenFilters: () => void;
  pendingCount: number;
  activeCount: number;
  urgentCount: number;
};

export const TasksOverview = ({
  user,
  search,
  onSearchChange,
  statusFilter,
  onOpenFilters,
  pendingCount,
  activeCount,
  urgentCount,
  totalTasks,
}: TasksOverviewProps) => {
  return (
    <section className="relative overflow-hidden pb-5 pt-4">
      <DashboardHeader user={user} />

      {/* ВИДЖЕТЫ */}

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

        {/* Большой */}

        <Link
          to="/my-tasks"
          className="rounded-[24px] bg-[var(--color-shell-card)] p-4"
        >
          <div className="flex items-center justify-between">
            <FolderKanban size={20} className="text-white/80" />

            <span className="text-xs text-white/50">активные</span>
          </div>

          <p className="mt-2 text-4xl font-semibold leading-none text-white">
            {totalTasks}
          </p>
          <p className="mt-2 text-sm text-white/70">Мои задачи</p>
        </Link>
      </div>
      <TaskSearch
        search={search}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onOpenFilters={onOpenFilters}
      />
    </section>
  );
};
