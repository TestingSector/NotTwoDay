import { useState, useEffect } from "react";
import { BottomSheet, FormInput } from "../../ui";

type StandardBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  standards: string[];
  customStandard: string;
  setCustomStandard: (value: string) => void;
  onSelect: (value: string) => void;
  selectedMethod: string;
};
const STANDARD_ORDER: Record<string, string[]> = {
  Растяжение: [
    "ГОСТ Р 56785-2015",
    "ASTM D3039",
    "ГОСТ 11262-2017",
    "ГОСТ 15873-2017",
  ],

  Сжатие: [
    "ГОСТ Р 56812-2015",
    "ГОСТ 4651-2014",
    "ГОСТ 33519-2015",
    "ASTM D6641",
  ],

  Изгиб: [
    "ГОСТ Р 56810-2015",
    "ГОСТ Р 56805-2015",
    "ГОСТ Р 56788-2015",
    "ASTM D7264",
  ],

  "Межслойный сдвиг": ["ГОСТ Р 57745-2017", "ГОСТ 32659-2014", "ASTM D2344"],
};

export const StandardBottomSheet = ({
  isOpen,
  onClose,
  standards,
  customStandard,
  setCustomStandard,
  onSelect,
  selectedMethod,
}: StandardBottomSheetProps) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCustomMode(false);
      setCustomStandard("");
    }
  }, [isOpen, setCustomStandard]);

  const handleClose = () => {
    setIsCustomMode(false);
    setCustomStandard("");
    onClose();
  };
  const order = STANDARD_ORDER[selectedMethod] ?? [];

  const sortedStandards = [...standards].sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b);
    }

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="Стандарт"
      subtitle="Выберите стандарт испытания"
    >
      {isCustomMode ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Стандарт не будет добавлен в справочник и будет использован только в
            текущей заявке.
          </p>

          <FormInput
            value={customStandard}
            onChange={(event) => setCustomStandard(event.target.value)}
            placeholder="Введите стандарт"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(false);
                setCustomStandard("");
              }}
              className="
                flex-1
                rounded-[18px]
                border
                border-[var(--color-border)]
                px-4
                py-3
              "
            >
              Назад
            </button>

            <button
              type="button"
              disabled={!customStandard.trim()}
              onClick={() => {
                onSelect(customStandard.trim());
                onClose();
              }}
              className="
                flex-1
                rounded-[18px]
                bg-[var(--color-accent)]
                px-4
                py-3
                font-medium
                text-white
                disabled:opacity-50
              "
            >
              Выбрать
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedStandards.map((standard) => (
            <button
              key={standard}
              type="button"
              onClick={() => {
                onSelect(standard);
                onClose();
              }}
              className="
                rounded-[18px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface-secondary)]
                px-4
                py-4
                text-left
                text-sm
                font-medium
                transition
                active:brightness-95
              "
            >
              {standard}
            </button>
          ))}

          <div className="mt-3 border-t border-[var(--color-border)] pt-3">
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(true);
              }}
              className="
                w-full
                rounded-[18px]
                border
                border-dashed
                border-[var(--color-accent)]
                px-4
                py-4
                text-left
                text-sm
                font-medium
                text-[var(--color-accent)]
              "
            >
              ✏️ Другой стандарт
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
