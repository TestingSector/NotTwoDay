import { BottomSheet } from "../../ui";
import { useAppStore } from "../../store/appStore";

const statusOptions = [
  {
    value: "all",
    label: "Все задачи",
  },
  {
    value: "pending",
    label: "Ожидают",
  },
  {
    value: "active",
    label: "В работе",
  },
  {
    value: "urgent",
    label: "Срочные",
  },
] as const;
const dateOptions = [
  {
    value: "all",
    label: "За всё время",
  },
  {
    value: "week",
    label: "Последняя неделя",
  },
  {
    value: "month",
    label: "Последний месяц",
  },
  {
    value: "custom",
    label: "Выбрать период",
  },
] as const;
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
      {activeSheet === "status" &&
        statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setStatusFilter(option.value);
              closeSheet();
            }}
            className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
              statusFilter === option.value
                ? "bg-[var(--color-shell)] text-white"
                : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
            }`}
          >
            {option.label}
          </button>
        ))}

      {activeSheet === "date" &&
        dateOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              setDateFilter(option.value);
              closeSheet();
            }}
            className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
              dateFilter === option.value
                ? "bg-[var(--color-shell)] text-white"
                : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
            }`}
          >
            {option.label}
          </button>
        ))}
    </BottomSheet>
  );
};
