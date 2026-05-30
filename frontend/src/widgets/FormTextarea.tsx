type FormTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const FormTextarea = ({
  value,
  onChange,
  placeholder,
}: FormTextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="
        w-full
        resize-none
        rounded-[18px]
        border
        border-[var(--color-border)]
        bg-[var(--color-surface-secondary)]
        px-4
        py-3
        outline-none
      "
    />
  );
};
