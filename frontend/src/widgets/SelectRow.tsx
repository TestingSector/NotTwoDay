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
      className="
        flex
        w-full
        items-center
        justify-between
        py-4
        text-left
      "
    >
      <div>
        <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>

        <p className="mt-1 font-medium">{value}</p>
      </div>

      <span className="text-xl text-[var(--color-text-secondary)]">›</span>
    </button>
  );
};
