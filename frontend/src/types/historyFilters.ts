export type HistoryFilters = {
  period: "all" | "week" | "month" | "year";
  executor: string | null;
  creator: string | null;
  method: string | null;
};
