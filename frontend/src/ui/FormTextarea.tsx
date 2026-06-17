import type { TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
  errorMessage?: string | null;
  wrapperClassName?: string;
};

export const FormTextarea = ({
  className = "",
  onBlur,
  error,
  errorMessage,
  wrapperClassName = "",
  ...props
}: FormTextareaProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    onBlur?.(e);
    // Safari iOS scroll workaround
    window.scrollTo({ top: 1, left: 1 });
  };

  return (
    <div className={`space-y-1 ${wrapperClassName}`}>
      <textarea
        {...props}
        onBlur={handleBlur}
        rows={4}
        className={`w-full resize-none rounded-[18px] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none transition ${error ? "border border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200" : "border border-[var(--color-border)] focus:border-[var(--color-accent)]"} ${className}`}
      />
      <p className="min-h-5 text-xs text-red-400">{errorMessage ?? ""}</p>
    </div>
  );
};
