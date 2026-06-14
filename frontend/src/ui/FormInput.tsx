import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ onBlur, ...props }: FormInputProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
    // Safari iOS scroll workaround
    window.scrollTo({ top: 1, left: 1 });
  };

  return (
    <input
      {...props}
      onBlur={handleBlur}
      className="w-full rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none transition"
    />
  );
};
