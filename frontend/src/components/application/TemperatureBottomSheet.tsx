import { BottomSheet, FormInput } from "../../ui";

type TemperatureBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  temperature: string | undefined;
  quantity: string | undefined;

  onTemperatureChange: (value: string) => void;
  onQuantityChange: (value: string) => void;

  onSave: () => void;
};

export const TemperatureBottomSheet = ({
  isOpen,
  onClose,

  temperature,
  quantity,

  onTemperatureChange,
  onQuantityChange,

  onSave,
}: TemperatureBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Температура"
      subtitle="Добавление условий испытаний"
    >
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
            Температура
          </p>

          <FormInput
            value={temperature}
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;

              if (/^-?\d*$/.test(value)) {
                onTemperatureChange(value);
              }
            }}
          />
        </div>

        <div>
          <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
            Количество образцов
          </p>

          <FormInput
            value={quantity}
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                onQuantityChange(value);
              }
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            onSave();
            onClose();
          }}
          className="mt-2 w-full rounded-[20px] bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-white transition-all active:brightness-90"
        >
          Сохранить
        </button>
      </div>
    </BottomSheet>
  );
};
