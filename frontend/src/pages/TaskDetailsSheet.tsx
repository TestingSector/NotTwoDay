import type { Task } from "../types/task";
import { DockIcon, MessageSquare, Package } from "lucide-react";
import { getShortName } from "../helpers/user";
import { getTaskTypeLabel } from "../helpers/shared";
import { TaskHistory } from "../components/taskDetails/TaskHistory";
type TaskDetailsSheetProps = {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskDetailsSheet = ({
  task,
  isOpen,
  onClose,
}: TaskDetailsSheetProps) => {
  if (!isOpen || !task) return null;

  const hasModulus = task.temperatureConditions.some(
    (condition) => condition.modulus,
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 h-[95vh] overflow-y-auto rounded-t-[32px] bg-[var(--color-surface)]"
      >
        {/* HEADER */}

        <header className="px-5 py-3 pb-5">
          <div className="mb-4 flex justify-center">
            <div className="h-1.5 w-16 rounded-full bg-[var(--color-border)]" />
          </div>

          <div className="text-center">
            <h1 className="text-[26px] font-semibold tracking-[-0.03em] text-[var(--color-shell)]">
              {getTaskTypeLabel(task.type)} №{task.number}
            </h1>

            <p className="mt-1 text-lg font-medium text-[var(--color-text-secondary)]">
              Испытание на {task.testMethod.toLowerCase()}
            </p>
          </div>
        </header>

        {/* CONTENT */}

        <main className="px-4 py-3">
          {/* Информация о заявке */}

          <div
            className="grid grid-cols-[40px_1fr] gap-3 rounded-[24px] bg-[var(--color-surface)] p-5"
            style={{
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="pt-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "var(--color-shell)",
                  color: "white",
                }}
              >
                <Package size={24} />
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Материал
              </p>

              <p className="break-words font-semibold leading-relaxed text-[var(--color-shell)]">
                {task.materialName}
              </p>
            </div>
          </div>

          <div
            className="mt-3 grid grid-cols-[40px_1fr] gap-3 rounded-[24px] bg-[var(--color-surface)] p-5"
            style={{
              boxShadow: "var(--shadow-soft)",
              background: "var(--color-shell)",
            }}
          >
            <div className="pt-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-shell)",
                }}
              >
                <DockIcon size={24} />
              </div>
            </div>

            <div>
              <p className="text-xs text-[var(--color-border)]">
                Договор/тематика
              </p>

              <p className="break-words font-semibold leading-relaxed text-[var(--color-surface)]">
                {task.topic}
              </p>
            </div>
          </div>

          {/* Основные данные */}
          <div
            className="mt-6 rounded-[24px] bg-[var(--color-surface)] p-5"
            style={{
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                Условия испытаний
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[var(--color-shell)]">
                {task.standard}
              </h2>
            </div>
            <div
              className={`grid ${
                hasModulus
                  ? "grid-cols-[24px_1fr_70px_70px]"
                  : "grid-cols-[24px_1fr_70px]"
              } items-center gap-3 border-b border-[var(--color-border)] pb-3 text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]`}
            >
              <div />

              <span>Темп.</span>

              {hasModulus && <span className="text-center">Модуль</span>}

              <span className="text-right">Шт.</span>
            </div>
            <div className="mt-2">
              {task.temperatureConditions.map((condition, index) => {
                const currentColor =
                  condition.temperature < 0
                    ? "#3B82F6"
                    : condition.temperature <= 25
                      ? "#22C55E"
                      : condition.temperature <= 120
                        ? "#F59E0B"
                        : "#EF4444";

                const nextColor =
                  index < task.temperatureConditions.length - 1
                    ? task.temperatureConditions[index + 1].temperature < 0
                      ? "#3B82F6"
                      : task.temperatureConditions[index + 1].temperature <= 25
                        ? "#22C55E"
                        : task.temperatureConditions[index + 1].temperature <=
                            120
                          ? "#F59E0B"
                          : "#EF4444"
                    : currentColor;

                return (
                  <div key={condition.temperature}>
                    <div
                      className={`relative grid ${
                        hasModulus
                          ? "grid-cols-[24px_1fr_70px_70px]"
                          : "grid-cols-[24px_1fr_70px]"
                      } items-center gap-3 py-3`}
                    >
                      {/* Точка + градиент */}

                      <div className="relative flex justify-center">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            background: currentColor,
                          }}
                        />

                        {index < task.temperatureConditions.length - 1 && (
                          <div
                            className="absolute top-3 w-[2px]"
                            style={{
                              height: "36px",
                              background: `linear-gradient(${currentColor}, ${nextColor})`,
                            }}
                          />
                        )}
                      </div>

                      {/* Температура */}

                      <span className="font-medium">
                        {condition.temperature} °C
                      </span>

                      {/* Модуль */}

                      {hasModulus && (
                        <div className="border-l border-r border-[var(--color-border)] text-center">
                          {condition.modulus ? "E" : "—"}
                        </div>
                      )}

                      {/* Количество */}

                      <span className="text-right font-medium text-[var(--color-shell)]">
                        {condition.quantity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 border-t border-[var(--color-border)] pt-4 text-right">
              <span className="text-[var(--color-text-secondary)]">Итого:</span>

              <span className="ml-2 font-semibold">
                {task.temperatureConditions.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </span>
            </div>
          </div>
          {/*Комментарий*/}
          {task.comment && (
            <div
              className="mt-6 grid grid-cols-[56px_1fr] gap-4 rounded-[24px] p-3"
              style={{
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div
                className="flex items-center justify-center self-stretch rounded-xl"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-surface)",
                }}
              >
                <MessageSquare size={24} />
              </div>

              <div>
                <p className="text-xs text-[var(--color-accent)]">
                  Комментарий заказчика
                </p>

                <p className="mt-2 break-words font-semibold leading-relaxed text-[var(--color-shell)]">
                  {task.comment}
                </p>
                <div className="mt-3 flex justify-end">
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    — {getShortName(task.creator)}
                  </span>
                </div>
              </div>
            </div>
          )}
          <TaskHistory task={task} />
        </main>
      </div>
    </div>
  );
};
