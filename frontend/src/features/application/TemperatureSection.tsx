type Temperature = {
  id: number;
  temperature: number;
  samples: number;
};

type TemperatureSectionProps = {
  temperatures: Temperature[];
  onAddTemperature: () => void;
  onDeleteTemperature: (id: number) => void;
};

export const TemperatureSection = ({
  temperatures,
  onAddTemperature,
  onDeleteTemperature,
}: TemperatureSectionProps) => {
  return (
    <div className="flex flex-col gap-3">
      {temperatures.map((item) => (
        <div
          key={item.id}
          className="
            rounded-[18px]
            border
            border-[var(--color-border)]
            bg-[var(--color-surface-secondary)]
            p-4
          "
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{item.temperature}°C</p>

            <button
              type="button"
              onClick={() => onDeleteTemperature(item.id)}
              className="
                text-sm
                text-[var(--color-accent)]
              "
            >
              Удалить
            </button>
          </div>

          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {item.samples} образцов
          </p>
        </div>
      ))}

      <button
        type="button"
        onClick={onAddTemperature}
        className="
          rounded-[18px]
          border-2
          border-dashed
          border-[var(--color-border)]
          py-4
          text-sm
          font-medium
          text-[var(--color-text-secondary)]
          transition
          hover:bg-[var(--color-surface-secondary)]
        "
      >
        + Добавить температуру
      </button>
    </div>
  );
};
