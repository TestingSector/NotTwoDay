import { create } from "zustand";
import type { DateFilter, StatusFilter } from "../types/filters";
import { devtools } from "zustand/middleware";

type FilterSheet = "status" | "date";

type AppStore = {
  statusFilter: StatusFilter;
  dateFilter: DateFilter;

  activeSheet: FilterSheet | null;

  setStatusFilter: (filter: StatusFilter) => void;

  setDateFilter: (filter: DateFilter) => void;

  openSheet: (sheet: FilterSheet) => void;

  closeSheet: () => void;
};

export const useAppStore = create<AppStore>()(
  devtools(
    (set) => ({
      statusFilter: "all",
      dateFilter: "all",

      activeSheet: null,

      setStatusFilter: (filter) =>
        set({
          statusFilter: filter,
        }),

      setDateFilter: (filter) =>
        set({
          dateFilter: filter,
        }),

      openSheet: (sheet) =>
        set({
          activeSheet: sheet,
        }),

      closeSheet: () =>
        set({
          activeSheet: null,
        }),
    }),
    {
      name: "AppStore",
    },
  ),
);
