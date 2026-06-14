import { BottomSheet, FormInput } from "../../ui";

type TemperatureBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  temperature: string | undefined;
  quantity: string | undefined;

  onTemperatureChange: (value: string) => void;
  onQuantityChange: (value: string) => void;

  onSave: () => void;
  temperatureError?: string | null;
  quantityError?: string | null;
};

export const TemperatureBottomSheet = ({
  isOpen,
  onClose,

  temperature,
  quantity,

  onTemperatureChange,
  onQuantityChange,

  onSave,
  temperatureError,
  quantityError,
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
            type="text"
            inputMode="text"
            pattern="^-?\d*$"
            autoComplete="off"
            value={temperature}
            onKeyDown={(e) => {
              if (
                e.key === "." ||
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+"
              ) {
                e.preventDefault();
              }
            }}
            onPaste={(e) => {
              const paste = e.clipboardData.getData("text");
              const input = e.currentTarget;
              const nextValue =
                input.value.slice(0, input.selectionStart ?? 0) +
                paste +
                input.value.slice(input.selectionEnd ?? input.value.length);

              if (!/^-?\d*$/.test(nextValue)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const value = e.target.value;

              if (/^-?\d*$/.test(value)) {
                onTemperatureChange(value);
              }
            }}
          />
          {temperatureError && (
            <p className="mt-1 text-xs text-red-400">{temperatureError}</p>
          )}
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
          {quantityError && (
            <p className="mt-1 text-xs text-red-400">{quantityError}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            onSave();
          }}
          className="mt-2 w-full rounded-[20px] bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-white transition-all active:brightness-90"
        >
          Сохранить
        </button>
      </div>
    </BottomSheet>
  );
};
