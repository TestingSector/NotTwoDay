import type { TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = ({
  className,
  onBlur,
  ...props
}: FormTextareaProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(e);
    // Safari iOS scroll workaround
    window.scrollTo({ top: 1, left: 1 });
  };

  return (
    <textarea
      {...props}
      onBlur={handleBlur}
      rows={4}
      className={`w-full resize-none rounded-[18px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none ${className ?? ""}`}
    />
  );
};
