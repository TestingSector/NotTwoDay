import type { Task } from "../../types/task";
import { formatDate } from "../../helpers/shared/formatDate";
import { getShortName } from "../../helpers/user";
import {
  FileText,
  LucideWrench,
  Package,
  User,
  CheckCheck,
} from "lucide-react";

type TestCardProps = {
  task: Task;
  isFirst?: boolean;
  onClick?: () => void;
};

export const TestCard = ({ task, isFirst, onClick }: TestCardProps) => {
  const isActive = task.status === "active";
  const isCompleted = task.status === "completed";

  const creator = task.creator;
  const executor = task.executor;
  const completionDate =
    isCompleted && task.completedAt ? formatDate(task.completedAt) : null;

  return (
    <article
      className={`border-b border-[var(--color-border)] pb-2 transition-colors active:bg-black/[0.02] ${
        isFirst ? "" : "pt-2"
      }`}
    >
      <div className="flex items-stretch gap-3" onClick={onClick}>
        <div
          className={`my-1 w-[3px] rounded-full ${
            isCompleted
              ? "bg-[var(--color-text-secondary)]"
              : isActive
                ? "bg-[var(--color-success)]"
                : "bg-[var(--color-accent)]"
          }`}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="grid grid-cols-[1fr_auto] gap-x-4">
            <h2 className="line-clamp-2 text-[15px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--color-text)]">
              Испытание на {task.testMethod.toLowerCase()}
            </h2>

            <div className="w-[76px] justify-self-center">
              {task.isUrgent && !isCompleted && (
                <div className="justify-self-center rounded-[12px] border border-[var(--color-accent)] px-3 py-1 text-center text-[11px] font-medium text-[var(--color-accent)]">
                  Срочно
                </div>
              )}
            </div>

            <p className="mt-1 flex items-center gap-2 text-[12px] leading-[1.25] text-[var(--color-text-secondary)]">
              <FileText size={12} />

              <span>
                {task.standard}

                {task.temperatureConditions.some((item) => item.modulus) && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Модуль</span>
                  </>
                )}
              </span>
            </p>

            <div className="mt-1 justify-self-center text-center">
              <p className="text-[12px] font-medium text-[var(--color-text)]">
                {task.temperatureConditions.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}{" "}
                обр.
              </p>
            </div>

            <p className="mt-1 flex items-center gap-2 text-[12px] leading-[1.25] text-[var(--color-text-secondary)]">
              <Package size={12} />

              <span>{task.materialName}</span>
            </p>

            <div className="justify-self-center text-center">
              <p className="text-[12px] font-medium text-[var(--color-text)]">
                8 ч.
              </p>
            </div>

            {/* пустая строка */}

            <div className="col-span-2 h-4" />

            <div className="flex items-center justify-between pb-1">
              <span className="flex items-center gap-2 text-[12px] text-[var(--color-text-muted)]">
                <User size={12} />
                {getShortName(creator)}
              </span>

              <span className="text-[11px] text-[var(--color-text-muted)]">
                Создана:
              </span>
            </div>

            <span className="justify-self-center text-[12px] text-[var(--color-text-muted)]">
              {formatDate(task.createdAt)}
            </span>

            {isActive && executor && (
              <>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-1">
                  <span className="flex items-center gap-2 text-[12px] text-[var(--color-success)]">
                    <LucideWrench size={12} />
                    {getShortName(executor)}
                  </span>

                  <span className="text-[11px] text-[var(--color-success)]">
                    Статус:
                  </span>
                </div>

                <span className="justify-self-center pt-1 text-[12px] text-[var(--color-success)]">
                  В работе
                </span>
              </>
            )}

            {isCompleted && executor && (
              <>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-1">
                  <span className="flex items-center gap-2 text-[12px] text-[var(--color-text-muted)]">
                    <CheckCheck size={12} />
                    {getShortName(executor)}
                  </span>

                  <span className="text-[11px] text-[var(--color-text-muted)]">
                    Завершена:
                  </span>
                </div>

                <span className="justify-self-center pt-1 text-[12px] text-[var(--color-text-muted)]">
                  {completionDate}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
