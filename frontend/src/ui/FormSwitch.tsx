type FormSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export const FormSwitch = ({
  checked,
  onChange,
  disabled = false,
}: FormSwitchProps) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative h-8 w-14 rounded-full transition-all duration-300
        ${checked ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm
          transition-all duration-300
          ${checked ? "left-6" : "left-0.5"}
        `}
      />
    </button>
  );
};
