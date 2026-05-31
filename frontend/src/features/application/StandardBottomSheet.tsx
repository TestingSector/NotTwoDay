import { BottomSheet } from "../../widgets/BottomSheet";

type StandardBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  standards: string[];

  onSelect: (value: string) => void;
};

export const StandardBottomSheet = ({
  isOpen,
  onClose,
  standards,
  onSelect,
}: StandardBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Стандарт"
      subtitle="Выберите стандарт испытания"
    >
      <div className="flex flex-col gap-2">
        {standards.map((standard) => (
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
      </div>
    </BottomSheet>
  );
};
