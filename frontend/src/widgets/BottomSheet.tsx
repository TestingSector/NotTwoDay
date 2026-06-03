type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;

  title: string;
  subtitle?: string;

  children: React.ReactNode;
};

export const BottomSheet = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: BottomSheetProps) => {
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
          max-h-[65vh]
          rounded-t-[32px]
          bg-[var(--color-surface)]
          px-6 pb-8 pt-4
          flex flex-col
          transition-transform duration-300
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-[var(--color-border)]" />

        <h2 className="text-2xl font-semibold">{title}</h2>

        {subtitle && (
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        )}

        <div className="mt-4 flex-1 overflow-y-auto pb-8">{children}</div>
      </div>
    </div>
  );
};
