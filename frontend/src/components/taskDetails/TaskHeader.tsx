import type { DragControls } from "framer-motion";
import { motion } from "framer-motion";
import { getTaskTypeLabel } from "../../helpers/shared";
import type { Task } from "../../types/task";

type TaskHeaderProps = {
  task: Task;
  dragControls: DragControls;
};

export const TaskHeader = ({ task, dragControls }: TaskHeaderProps) => {
  return (
    <motion.header
      className="px-5 pb-5 pt-4"
      style={{
        touchAction: "none",
      }}
      onPointerDown={(e) => dragControls.start(e)}
    >
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
    </motion.header>
  );
};
