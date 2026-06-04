export const getTaskTypeLabel = (type: string) => {
  switch (type) {
    case "KPO":
      return "КПО";

    case "NTZ":
      return "НТЗ";

    default:
      return type;
  }
};
