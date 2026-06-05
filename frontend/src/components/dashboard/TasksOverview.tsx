import { Link } from "react-router-dom";
import { Plus, FolderKanban, SlidersHorizontal } from "lucide-react";
import type { User } from "../../types/user";

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
      <div className="absolute -top-20 left-0 overflow-hidden">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="opacity-60"
        >
          <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
            <path d="M40 20 L80 60 L40 100 L0 60 Z" />
            <path d="M120 20 L160 60 L120 100 L80 60 Z" />
            <path d="M200 20 L240 60 L200 100 L160 60 Z" />

            <path d="M80 60 L120 100 L80 140 L40 100 Z" />
            <path d="M160 60 L200 100 L160 140 L120 100 Z" />

            <path d="M40 100 L80 140 L40 180 L0 140 Z" />
            <path d="M120 100 L160 140 L120 180 L80 140 Z" />
          </g>
        </svg>
      </div>
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/10" />

      <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-white/5" />

      <div>
        <h1 className="mt-2 text-[32px] font-semibold leading-none text-white">
          {user.firstName}
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Лаборатория №{user.laboratory}
        </p>
      </div>

      {/* ВИДЖЕТЫ */}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {/* Левая часть */}

        <div className="grid grid-cols-2 gap-2">
          <div className="flex h-[64px] flex-col items-center justify-center rounded-[18px] border border-[#3B82F680] bg-[#3B82F670] text-[var(--color-surface)]">
            <span className="text-lg font-semibold">{pendingCount}</span>
            <span className="text-[8px] uppercase tracking-wide">Ожидание</span>
          </div>

          <div className="flex h-[64px] flex-col items-center justify-center rounded-[18px] border border-[#22C55E80] bg-[#22C55E70] text-[var(--color-surface)]">
            <span className="text-lg font-semibold">{activeCount}</span>
            <span className="text-[8px] uppercase tracking-wide">В работе</span>
          </div>

          <div className="flex h-[64px] flex-col items-center justify-center rounded-[18px] border border-[#F59E0B80] bg-[#F59E0B70] text-[var(--color-surface)]">
            <span className="text-lg font-semibold">{urgentCount}</span>
            <span className="text-[8px] uppercase tracking-wide">Срочно</span>
          </div>

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

      {/* ПОИСК */}

      <div className="mt-4 flex gap-3">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск задачи..."
          className="flex-1 rounded-[18px] border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={onOpenFilters}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[18px] border border-white/10 bg-white/10 text-white"
        >
          <SlidersHorizontal size={18} />

          {statusFilter !== "all" && (
            <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          )}
        </button>
      </div>
    </section>
  );
};
