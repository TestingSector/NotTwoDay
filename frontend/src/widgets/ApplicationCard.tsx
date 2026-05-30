type ApplicationCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const ApplicationCard = ({
  title,
  children,
  className = "",
}: ApplicationCardProps) => {
  return (
    <div
      className={`rounded-[24px] bg-[var(--color-surface)] p-5 ${className}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <h2 className="text-base font-semibold text-[var(--color-text)]">
        {title}
      </h2>

      <div className="mt-4">{children}</div>
    </div>
  );
};
