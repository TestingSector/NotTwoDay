import { BottomSheet } from "../../../widgets/BottomSheet";

type TestMethodBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  methods: string[];

  onSelect: (value: string) => void;
};

export const TestMethodBottomSheet = ({
  isOpen,
  onClose,
  methods,
  onSelect,
}: TestMethodBottomSheetProps) => {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Вид испытания"
      subtitle="Выберите тип испытания"
    >
      <div className="flex flex-col gap-2">
        {methods.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => {
              onSelect(method);
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
            {method}
          </button>
        ))}
      </div>
    </BottomSheet>
  );
};
