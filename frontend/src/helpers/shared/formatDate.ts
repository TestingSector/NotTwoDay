export const formatDate = (value: string | number) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};
