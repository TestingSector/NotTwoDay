import type { DashboardFilters } from "../../types/dashboardFilters";
import { BottomSheet } from "../../ui";

interface DashboardFilterSheetProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}
const filterOptions = [
  {
    status: "all",
    label: "Все задачи",
  },
  {
    status: "pending",
    label: "Ожидают",
  },
  {
    status: "active",
    label: "В работе",
  },
  {
    status: "urgent",
    label: "Срочные",
  },
] as const;
const laboratories = ["610", "611", "612"] as const;
export const FilterSheet = ({
  isFilterOpen,
  setIsFilterOpen,
  filters,
  onFiltersChange,
}: DashboardFilterSheetProps) => {
  return (
    <BottomSheet
      isOpen={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
      title="Фильтр задач"
      subtitle="Выберите отображаемые задачи"
    >
      <h3 className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
        Статус
      </h3>

      {filterOptions.map((filter) => (
        <button
          key={filter.status}
          onClick={() =>
            onFiltersChange({
              ...filters,
              status: filter.status,
            })
          }
          className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
            filters.status === filter.status
              ? "bg-[var(--color-shell)] text-white"
              : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
          }`}
        >
          {filter.label}
        </button>
      ))}

      <h3 className="mb-2 mt-5 text-sm font-medium text-[var(--color-text-secondary)]">
        Лаборатория
      </h3>

      <button
        onClick={() =>
          onFiltersChange({
            ...filters,
            laboratory: null,
          })
        }
        className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
          filters.laboratory === null
            ? "bg-[var(--color-shell)] text-white"
            : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
        }`}
      >
        Все лаборатории
      </button>

      {laboratories.map((lab) => (
        <button
          key={lab}
          onClick={() =>
            onFiltersChange({
              ...filters,
              laboratory: lab,
            })
          }
          className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
            filters.laboratory === lab
              ? "bg-[var(--color-shell)] text-white"
              : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
          }`}
        >
          Лаборатория {lab}
        </button>
      ))}

      <button
        onClick={() => setIsFilterOpen(false)}
        className="mt-5 w-full rounded-[20px] bg-[var(--color-accent)] p-4 font-medium text-white"
      >
        Применить
      </button>
    </BottomSheet>
  );
};
