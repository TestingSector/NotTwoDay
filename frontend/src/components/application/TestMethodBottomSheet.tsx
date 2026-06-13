import { useState, useEffect } from "react";
import { BottomSheet, FormInput } from "../../ui";

const METHOD_ORDER = [
  "Растяжение",
  "Сжатие",
  "Изгиб",
  "Межслойный сдвиг",

  "Отслаивание",
  "Разрыв ткани",
  "Отрыв",

  "Сдвиг в плоскости",
  "Сдвиг по Иосипеску",

  "Удар падающим грузом",
  "Сжатие после удара",
  "Поперечное растяжение",
];

type TestMethodBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  methods: string[];
  customMethod: string;
  setCustomMethod: (value: string) => void;
  onSelect: (value: string) => void;
};

export const TestMethodBottomSheet = ({
  isOpen,
  onClose,
  methods,
  customMethod,
  setCustomMethod,
  onSelect,
}: TestMethodBottomSheetProps) => {
  const [isCustomMode, setIsCustomMode] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCustomMode(false);
      setCustomMethod("");
    }
  }, [isOpen, setCustomMethod]);
  const sortedMethods = [...methods].sort((a, b) => {
    const indexA = METHOD_ORDER.indexOf(a);
    const indexB = METHOD_ORDER.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b);
    }

    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });
  const handleClose = () => {
    setIsCustomMode(false);
    setCustomMethod("");
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="Вид испытания"
      subtitle="Выберите тип испытания"
    >
      {isCustomMode ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Метод не будет добавлен в справочник и будет использован только в
            текущей заявке.
          </p>

          <FormInput
            value={customMethod}
            onChange={(event) => setCustomMethod(event.target.value)}
            placeholder="Введите название испытания"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(false);
                setCustomMethod("");
              }}
              className="flex-1 rounded-[18px] border border-[var(--color-border)] px-4 py-3"
            >
              Назад
            </button>

            <button
              type="button"
              disabled={!customMethod.trim()}
              onClick={() => {
                onSelect(customMethod.trim());
                onClose();
              }}
              className="flex-1 rounded-[18px] bg-[var(--color-accent)] px-4 py-3 font-medium text-white disabled:opacity-50"
            >
              Выбрать
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedMethods.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => {
                onSelect(method);
              }}
              className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-4 text-left text-sm font-medium transition active:brightness-95"
            >
              {method}
            </button>
          ))}
          <div className="mt-3 border-t border-[var(--color-border)] pt-3">
            <button
              type="button"
              onClick={() => {
                setIsCustomMode(true);
              }}
              className="w-full rounded-[18px] border border-dashed border-[var(--color-accent)] px-4 py-4 text-left text-sm font-medium text-[var(--color-accent)]"
            >
              ✏️ Другое испытание
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
};
