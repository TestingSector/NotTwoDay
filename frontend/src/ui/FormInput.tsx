import { forwardRef, type InputHTMLAttributes } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  errorMessage?: string | null;
  wrapperClassName?: string;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      onBlur,
      className = "",
      error,
      errorMessage,
      wrapperClassName = "",
      ...props
    },
    ref,
  ) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);

      // Safari iOS scroll workaround
      window.scrollTo({ top: 1, left: 1 });
    };

    return (
      <div className={`space-y-1 ${wrapperClassName}`}>
        <input
          ref={ref}
          {...props}
          onBlur={handleBlur}
          className={`w-full rounded-[18px] bg-[var(--color-surface-secondary)] px-4 py-3 outline-none transition ${
            error
              ? "border border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200"
              : "border border-[var(--color-border)] focus:border-[var(--color-accent)]"
          } ${className}`}
        />

        {errorMessage && (
          <p className="min-h-5 pl-4 text-xs text-red-400">{errorMessage}</p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
