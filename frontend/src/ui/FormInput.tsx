type FormInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const FormInput = ({ value, onChange, placeholder }: FormInputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface-secondary)]
        px-4
        py-3
        outline-none
        transition
      "
    />
  );
};
