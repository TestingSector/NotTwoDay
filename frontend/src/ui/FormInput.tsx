import type { InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

export const FormInput = (props: FormInputProps) => {
  return (
    <input
      {...props}
      className="w-full rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none transition"
    />
  );
};
