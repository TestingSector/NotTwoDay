import { ChevronDown, X } from "lucide-react";
import { useAppStore } from "../../store/appStore";
import { TaskFiltersSheet } from "./TaskFiltersSheet";
type TaskFiltersProps = {
  showStatus?: boolean;
  showDate?: boolean;
};
export const TaskFilters = ({
  showStatus = false,
  showDate = false,
}: TaskFiltersProps) => {
  const statusFilter = useAppStore((state) => state.statusFilter);
  const dateFilter = useAppStore((state) => state.dateFilter);

  const openSheet = useAppStore((state) => state.openSheet);

  const setStatusFilter = useAppStore((state) => state.setStatusFilter);

  const setDateFilter = useAppStore((state) => state.setDateFilter);

  const isStatusActive = statusFilter !== "all";
  const isDateActive = dateFilter !== "all";

  return (
    <>
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {showStatus && (
          <button
            onClick={() => openSheet("status")}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
              isStatusActive
                ? "bg-[var(--color-accent)] text-white"
                : "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 border text-[var(--color-text)]"
            }`}
          >
            Статус
            {isStatusActive ? (
              <X
                size={12}
                onClick={(e) => {
                  e.stopPropagation();
                  setStatusFilter("all");
                }}
              />
            ) : (
              <ChevronDown size={12} />
            )}
          </button>
        )}

        {showDate && (
          <button
            onClick={() => openSheet("date")}
            className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
              isDateActive
                ? "bg-[var(--color-accent)] text-white"
                : "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 border text-[var(--color-text)]"
            }`}
          >
            Период
            {isDateActive ? (
              <X
                size={12}
                onClick={(e) => {
                  e.stopPropagation();
                  setDateFilter("all");
                }}
              />
            ) : (
              <ChevronDown size={12} />
            )}
          </button>
        )}
      </div>

      <TaskFiltersSheet />
    </>
  );
};
