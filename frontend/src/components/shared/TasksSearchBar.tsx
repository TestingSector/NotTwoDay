import { SlidersHorizontal } from "lucide-react";

type TasksSearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  hasActiveFilter: boolean;

  onOpenFilters: () => void;
};

export function TasksSearchBar({
  search,
  onSearchChange,
  hasActiveFilter,
  onOpenFilters,
}: TasksSearchBarProps) {
  return (
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

        {hasActiveFilter && (
          <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        )}
      </button>
    </div>
  );
}
