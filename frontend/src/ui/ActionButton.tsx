type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
};

export const ActionButton = ({
  children,
  type,
  onClick,
  className = "",
  disabled = false,
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} w-full rounded-[20px] bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-white transition active:brightness-90 ${disabled ? "pointer-events-none opacity-50" : ""}`}
      style={{
        boxShadow: "0 8px 20px rgba(176, 16, 43, 0.25)",
      }}
    >
      {children}
    </button>
  );
};
