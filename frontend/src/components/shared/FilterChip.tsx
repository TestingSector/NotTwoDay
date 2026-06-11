import { ChevronDown, X } from "lucide-react";

type FilterChipProps = {
  label: string;
  active?: boolean;

  onClick: () => void;
  onReset?: () => void;
};

export const FilterChip = ({
  label,
  active = false,
  onClick,
  onReset,
}: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-medium transition-colors ${
        active
          ? "bg-[var(--color-shell)] text-white"
          : "bg-[var(--color-text-muted)] text-white"
      }`}
    >
      <span>{label}</span>

      {active && onReset ? (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
        >
          <X size={12} />
        </span>
      ) : (
        <ChevronDown size={12} />
      )}
    </button>
  );
};
