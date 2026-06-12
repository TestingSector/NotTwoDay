import type { TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = ({ className, ...props }: FormTextareaProps) => {
  return (
    <textarea
      {...props}
      rows={4}
      className={`w-full resize-none rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none ${className ?? ""}`}
    />
  );
};
