type TestCardProps = {
  title: string;
  gost: string;
  author: string;
  createdAt: string;
};

export const TestCard = ({
  title,
  gost,
  author,
  createdAt,
}: TestCardProps) => {
  return (
    <article className="border-b border-[var(--color-border)] py-2.5 transition-colors active:bg-black/5">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-11 w-[3px] rounded-full bg-[var(--color-accent)]/80" />

        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[13px] font-semibold leading-tight text-[var(--color-text)]">
              {title}
            </h2>

            <p className="mt-1 text-sm leading-tight text-[var(--color-text-secondary)]">
              {gost}
            </p>

            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              {author}
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="rounded-xl border border-[var(--color-border)] bg-white/50 px-2.5 py-1 text-xs font-medium text-[var(--color-accent)]">
              18ч
            </div>

            <span className="text-[11px] text-[var(--color-text-secondary)]">
              {createdAt}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};