import { MessageSquare } from "lucide-react";
import { getShortName } from "../../helpers/user";
import type { Task } from "../../types/task";
type TaskCommentsProps = {
  task: Task;
};
export const TaskComments = ({ task }: TaskCommentsProps) => {
  return (
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
  );
};
