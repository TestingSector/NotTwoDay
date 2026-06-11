import { useAppStore } from "../../store/appStore";
import { TaskFiltersSheet } from "./TaskFiltersSheet";
import { FilterChip } from "./FilterChip";
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
          <FilterChip
            label="Статус"
            active={isStatusActive}
            onClick={() => openSheet("status")}
            onReset={() => setStatusFilter("all")}
          />
        )}

        {showDate && (
          <FilterChip
            label="Период"
            active={isDateActive}
            onClick={() => openSheet("date")}
            onReset={() => setDateFilter("all")}
          />
        )}
      </div>

      <TaskFiltersSheet />
    </>
  );
};
