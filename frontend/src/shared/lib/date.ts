export const formatTaskDate = (value: string | number) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);
};
