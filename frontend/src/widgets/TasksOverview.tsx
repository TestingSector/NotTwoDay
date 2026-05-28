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
    <section className="rounded-[var(--radius-lg)] bg-[var(--color-shell)] px-4 pb-3 pt-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-white/60">
            СРЕДА
          </p>

          <h1 className="mt-1 text-[32px] font-semibold leading-none text-white">
            20 мая
          </h1>
        </div>

        <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-2 text-right">
          <p className="text-[11px] uppercase tracking-wide text-white/50">
            задач
          </p>

          <p className="text-lg font-semibold text-white">
            12
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        {weekDays.map((item) => (
          <button
            key={item.date}
            className={`flex min-w-[52px] flex-col items-center rounded-[var(--radius-md)] border px-3 py-2 transition-colors ${
              item.active
                ? "border-transparent bg-[var(--color-surface)] text-[var(--color-accent)]"
                : "border-white/10 bg-white/5 text-white"
            }`}
          >
            <span className="text-[11px] opacity-60">
              {item.day}
            </span>

            <span className="mt-1 text-sm font-medium">
              {item.date}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
  <div className="rounded-[16px] border border-[var(--color-shell-border)] bg-[var(--color-shell-card)] px-3 py-1.5 text-[11px] font-medium text-white">
    Всего · 3
  </div>

  <div className="rounded-[16px] bg-[var(--color-accent)] px-3 py-1.5 text-[11px] font-medium text-white">
    Срочные · 1
  </div>
</div>

    </section>
  );
};