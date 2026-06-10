import { BottomSheet } from "../../ui";
import type { HistoryFilters } from "../../types/historyFilters";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: HistoryFilters;
  onFiltersChange: (filters: HistoryFilters) => void;
};

const periodOptions = [
  { value: "all", label: "За всё время" },
  { value: "week", label: "За неделю" },
  { value: "month", label: "За месяц" },
  { value: "year", label: "За год" },
] as const;

export const HistoryFilterSheet = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: Props) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Фильтр истории"
      subtitle="Настройте отображение испытаний"
    >
      <h3 className="mb-2 text-sm font-medium text-[var(--color-text-secondary)]">
        Период
      </h3>

      {periodOptions.map((period) => (
        <button
          key={period.value}
          onClick={() =>
            onFiltersChange({
              ...filters,
              period: period.value,
            })
          }
          className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
            filters.period === period.value
              ? "bg-[var(--color-shell)] text-white"
              : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
          }`}
        >
          {period.label}
        </button>
      ))}

      <button
        onClick={onClose}
        className="mt-5 w-full rounded-[20px] bg-[var(--color-accent)] p-4 font-medium text-white"
      >
        Применить
      </button>
    </BottomSheet>
  );
};
