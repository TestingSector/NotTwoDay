export const formatTaskDate = (
  timestamp: number,
) => {
  return new Intl.DateTimeFormat(
    "ru-RU",
    {
      day: "numeric",
      month: "long",
    },
  ).format(timestamp);
};