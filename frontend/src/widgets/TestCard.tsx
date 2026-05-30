import type { Task } from "../shared/types/task";
import { formatTaskDate } from "../shared/lib/date";
import { getShortName } from "../shared/lib/user";

type TestCardProps = {
  task: Task;
  isFirst?: boolean;
};

export const TestCard = ({ task, isFirst }: TestCardProps) => {
  const isActive = task.status === "active";

  const isCompleted = task.status === "completed";

  const creator = task.creator;
  const executor = task.executor;

  return (
    <article
      className={`border-b border-[var(--color-border)] pb-6 transition-colors active:bg-black/[0.02] ${
        isFirst ? "" : "pt-6"
      } `}
    >
      <div className="flex items-stretch gap-3">
        <div
          className={`my-1 w-[3px] rounded-full ${
            isCompleted
              ? "bg-[var(--color-text-secondary)]"
              : isActive
                ? "bg-[var(--color-success)]"
                : "bg-[var(--color-accent)]"
          }`}
        />
        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
              {task.title}
            </h2>

            <p className="mt-1 text-[13px] leading-tight text-[var(--color-text-secondary)]">
              {task.gost}
            </p>

            <p className="mt-1 text-[12px] text-[var(--color-text-secondary)]">
              {getShortName(creator)}
            </p>

            {executor && (
              <div className="mt-3 flex items-center gap-2">
                {isActive && (
                  <div className="rounded-[14px] bg-[var(--color-success-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-success)]">
                    В работе
                  </div>
                )}

                <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {getShortName(executor)}
                </div>
              </div>
            )}
          </div>

          <div className="flex h-full flex-col items-end justify-between gap-2">
            <div className="flex items-center gap-2">
              {task.isUrgent && !isCompleted && (
                <div className="rounded-[14px] bg-[var(--color-accent)] px-2.5 py-1 text-[11px] font-medium text-white">
                  Срочно
                </div>
              )}

              <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text)]">
                {task.estimatedTime}
              </div>
            </div>

            <div className="flex flex-col items-end">
              {isCompleted && task.completedAt && (
                <span className="text-[10px] text-[var(--color-text-secondary)]">
                  Завершена
                </span>
              )}

              <span className="text-[11px] text-[var(--color-text-secondary)]">
                {isCompleted && task.completedAt
                  ? formatTaskDate(task.completedAt)
                  : formatTaskDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
