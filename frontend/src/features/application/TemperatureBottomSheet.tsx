import { FormInput } from "../../widgets/FormInput";

type TemperatureBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  temperature: string;
  samples: string;

  onTemperatureChange: (value: string) => void;
  onSamplesChange: (value: string) => void;

  onSave: () => void;
};

export const TemperatureBottomSheet = ({
  isOpen,
  onClose,
  temperature,
  samples,
  onTemperatureChange,
  onSamplesChange,
  onSave,
}: TemperatureBottomSheetProps) => {
  return (
    <div
      className={`
        fixed inset-0 z-50 transition-all duration-300
        ${
          isOpen
            ? "pointer-events-auto bg-black/40"
            : "pointer-events-none bg-black/0"
        }
      `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          absolute bottom-0 left-0 right-0
          rounded-t-[32px]
          bg-[var(--color-surface)]
          px-6 pb-8 pt-4
          transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[var(--color-border)]" />

        <h2 className="text-2xl font-semibold">Температура</h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Добавление условий испытаний
        </p>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
              Температура
            </p>

            <FormInput
              value={temperature}
              onChange={onTemperatureChange}
              placeholder="Например: 120"
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
              Количество образцов
            </p>

            <FormInput
              value={samples}
              onChange={onSamplesChange}
              placeholder="Например: 6"
            />
          </div>

          <button
            type="button"
            onClick={onSave}
            className="
            mt-2
            w-full
            rounded-[20px]
            bg-[var(--color-accent)]
            px-6
            py-4
            text-base
            font-semibold
            text-white
            transition-all
            active:brightness-90
  "
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
