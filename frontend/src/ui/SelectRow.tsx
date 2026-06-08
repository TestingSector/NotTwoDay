import { ChevronDown } from "lucide-react";

type SelectRowProps = {
  label: string;
  value: string;
  onClick?: () => void;
};

export const SelectRow = ({ label, value, onClick }: SelectRowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-4 text-left"
    >
      <div>
        <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>

        <p className="mt-1 font-medium">{value}</p>
      </div>

      <ChevronDown size={18} className="text-[var(--color-text-secondary)]" />
    </button>
  );
};
