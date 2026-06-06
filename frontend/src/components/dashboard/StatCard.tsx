type StatCardProps = {
  value: number;
  label: string;
  borderColor: string;
  backgroundColor: string;
};

export function StatCard({
  value,
  label,
  borderColor,
  backgroundColor,
}: StatCardProps) {
  return (
    <div
      className="flex h-[64px] flex-col items-center justify-center rounded-[18px] text-[var(--color-surface)]"
      style={{
        border: `1px solid ${borderColor}`,
        background: backgroundColor,
      }}
    >
      <span className="text-lg font-semibold">{value}</span>

      <span className="text-[8px] uppercase tracking-wide">{label}</span>
    </div>
  );
}
