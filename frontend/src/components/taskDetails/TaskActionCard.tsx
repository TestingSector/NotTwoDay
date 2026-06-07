import { ChevronRight, Zap } from "lucide-react";

type TaskActionsCardProps = {
  onClick: () => void;
};

export const TaskActionsCard = ({ onClick }: TaskActionsCardProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-full rounded-[24px] bg-[var(--color-surface)] p-5 text-left"
      style={{
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--color-shell)] text-white">
            <Zap size={20} />
          </div>

          <div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Доступные действия
            </p>

            <h3 className="text-lg font-semibold">Управление заявкой</h3>
          </div>
        </div>

        <ChevronRight
          className="text-[var(--color-text-secondary)]"
          size={22}
        />
      </div>
    </button>
  );
};
