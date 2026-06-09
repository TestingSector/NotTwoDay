import type { DragControls } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { getTaskTypeLabel } from "../../helpers/shared";
import type { Task } from "../../types/task";
import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

type TaskHeaderProps = {
  task: Task;
  dragControls: DragControls;

  onEdit: () => void;
  onDelete: () => void;
};

export const TaskHeader = ({
  task,
  dragControls,
  onEdit,
  onDelete,
}: TaskHeaderProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  return (
    <motion.header
      className="px-5 pb-5 pt-4"
      style={{ touchAction: "none" }}
      onPointerDown={(e) => dragControls.start(e)}
    >
      <div className="mb-4 flex justify-center">
        <div className="h-1.5 w-16 rounded-full bg-[var(--color-border)]" />
      </div>

      <div className="relative text-center">
        <button
          className="absolute right-0 top-0 rounded-full p-2 transition hover:bg-black/5"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setIsActionsOpen((prev) => !prev);
          }}
        >
          <MoreVertical size={20} />
        </button>

        <h1 className="text-[26px] font-semibold tracking-[-0.03em] text-[var(--color-shell)]">
          {getTaskTypeLabel(task.type)} №{task.number}
        </h1>

        <p className="mt-1 text-lg font-medium text-[var(--color-text-secondary)]">
          Испытание на {task.testMethod.toLowerCase()}
        </p>

        <AnimatePresence>
          {isActionsOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                onClick={() => setIsActionsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-10 z-50 w-52 origin-top-right overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg"
              >
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-black/5"
                  onClick={onEdit}
                >
                  <Pencil size={18} />
                  Редактировать
                </button>

                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  onClick={onDelete}
                >
                  <Trash2 size={18} />
                  Удалить
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
