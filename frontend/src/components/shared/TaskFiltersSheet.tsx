import { BottomSheet } from "../../ui";
import { useAppStore } from "../../store/appStore";

const statusOptions = [
  { value: "all", label: "Все задачи" },
  { value: "pending", label: "Ожидают" },
  { value: "active", label: "В работе" },
  { value: "urgent", label: "Срочные" },
] as const;

const dateOptions = [
  { value: "all", label: "За всё время" },
  { value: "week", label: "Неделя" },
  { value: "month", label: "Месяц" },
  { value: "custom", label: "Период" },
] as const;

type FilterOptionButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const FilterOptionButton = ({
  label,
  active,
  onClick,
}: FilterOptionButtonProps) => (
  <button
    onClick={onClick}
    className={`flex h-12 items-center justify-center rounded-[16px] border text-sm font-medium transition-colors ${
      active
        ? "border-[var(--color-shell)] bg-[var(--color-shell)] text-white"
        : "border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
    }`}
  >
    {label}
  </button>
);

export const TaskFiltersSheet = () => {
  const activeSheet = useAppStore((state) => state.activeSheet);
  const closeSheet = useAppStore((state) => state.closeSheet);

  const statusFilter = useAppStore((state) => state.statusFilter);
  const setStatusFilter = useAppStore((state) => state.setStatusFilter);

  const dateFilter = useAppStore((state) => state.dateFilter);
  const setDateFilter = useAppStore((state) => state.setDateFilter);

  return (
    <BottomSheet
      isOpen={activeSheet !== null}
      onClose={closeSheet}
      title={activeSheet === "status" ? "Статус задач" : "Период"}
    >
      {activeSheet === "status" && (
        <div className="grid grid-cols-2 gap-2">
          {statusOptions.map((option) => (
            <FilterOptionButton
              key={option.value}
              label={option.label}
              active={statusFilter === option.value}
              onClick={() => {
                setStatusFilter(option.value);
                closeSheet();
              }}
            />
          ))}
        </div>
      )}

      {activeSheet === "date" && (
        <div className="grid grid-cols-2 gap-2">
          {dateOptions.map((option) => (
            <FilterOptionButton
              key={option.value}
              label={option.label}
              active={dateFilter === option.value}
              onClick={() => {
                setDateFilter(option.value);
                closeSheet();
              }}
            />
          ))}
        </div>
      )}
    </BottomSheet>
  );
};
