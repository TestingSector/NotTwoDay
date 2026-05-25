const weekDays = [
  {
    day: "Пн",
    date: "18",
    active: false,
  },
  {
    day: "Вт",
    date: "19",
    active: false,
  },
  {
    day: "Ср",
    date: "20",
    active: true,
  },
  {
    day: "Чт",
    date: "21",
    active: false,
  },
  {
    day: "Пт",
    date: "22",
    active: false,
  },
];

export const TasksOverview = () => {
  return (
    <section className="rounded-[28px] bg-[#233652] px-4 pb-4 pt-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/70">
            Среда
          </p>

          <h1 className="mt-1 text-[34px] font-bold leading-none text-white">
            20 мая
          </h1>
        </div>

        <div className="rounded-2xl bg-white/8 px-4 py-2 text-right">
          <p className="text-xs text-white/70">
            Задач
          </p>

          <p className="text-lg font-semibold text-white">
            12
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        {weekDays.map((item) => (
          <button
            key={item.date}
            className={`flex min-w-[52px] flex-col items-center rounded-[20px] px-3 py-2.5 transition-colors ${
              item.active
                ? "bg-[var(--surface)] text-[var(--primary)]"
                : "bg-white/10 text-white"
            }`}
          >
            <span className="text-xs opacity-70">
              {item.day}
            </span>

            <span className="mt-1 text-sm font-semibold">
              {item.date}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          Сжатие · 5
        </div>

        <div className="rounded-full bg-[#8b3e3e] px-3 py-1 text-xs font-medium text-white">
          Модуль · 2
        </div>
      </div>
    </section>
  );
};