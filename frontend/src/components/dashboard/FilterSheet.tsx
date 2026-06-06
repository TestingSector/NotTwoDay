import type { TaskStatusFilter } from "../../types/taskStatusFilter";
import { BottomSheet } from "../../ui";

interface Props {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (value: TaskStatusFilter) => void;
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

export const FilterSheet = ({isFilterOpen,setIsFilterOpen,statusFilter,onStatusFilterChange }: Props) => {
    return (
        <BottomSheet
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              title="Фильтр задач"
              subtitle="Выберите отображаемые задачи"
            >
              {filterOptions.map((filter) => (
                <button
                  key={filter.status}
                  onClick={() => {
                    onStatusFilterChange(filter.status as typeof statusFilter);
                    setIsFilterOpen(false);
                  }}
                  className={`my-1 w-full rounded-[20px] p-4 text-left shadow transition-colors ${
                    statusFilter === filter.status
                      ? "bg-[var(--color-shell)] text-white"
                      : "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                  } `}
                >
                  {filter.label}
                </button>
              ))}
            </BottomSheet>
    )
}