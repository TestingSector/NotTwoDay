import type { Task } from "../types/task";
import { DockIcon, Package, LucideClockAlert } from "lucide-react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import {
  TaskComments,
  TaskHeader,
  TaskHistory,
  TaskInformation,
  TemperatureConditionsCard,
} from "../components/taskDetails";
import { useRef } from "react";

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
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  if (!isOpen || !task) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      onClick={onClose}
    >
      <motion.div
        drag="y"
        style={{ y }}
        dragControls={dragControls}
        dragListener={false}
        dragSnapToOrigin
        dragDirectionLock
        dragElastic={0.1}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 700) {
            onClose();
          }
        }}
        onDrag={(_, info) => {
          if (info.offset.y < 0) {
            y.set(0);
          }
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="absolute bottom-0 left-0 right-0 h-[85dvh] overflow-y-auto rounded-t-[32px] bg-[var(--color-surface)]"
        ref={sheetRef}
      >
        <TaskHeader task={task} dragControls={dragControls} />
        <main className="px-4 py-3">
          {task.isUrgent && (
            <TaskInformation
              Icon={LucideClockAlert}
              title="Срочно"
              description={task.urgentReason}
              variant="urgent"
            />
          )}
          <TaskInformation
            Icon={Package}
            title="Материал"
            description={task.materialName}
            variant="material"
          />
          <TaskInformation
            Icon={DockIcon}
            title="Договор/тематика"
            description={task.topic}
            variant="document"
          />
          <TemperatureConditionsCard
            standard={task.standard}
            conditions={task.temperatureConditions}
          />
          {task.comment && <TaskComments task={task} />}
          <TaskHistory
            task={task}
            onOpenHistory={() => {
              setTimeout(() => {
                sheetRef.current?.scrollTo({
                  top: sheetRef.current.scrollHeight,
                  behavior: "smooth",
                });
              }, 100);
            }}
          />
        </main>
      </motion.div>
    </motion.div>
  );
};
