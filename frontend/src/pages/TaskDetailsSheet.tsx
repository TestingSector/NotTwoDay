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
import { ActionButton, Backdrop } from "../ui";
import { useRef } from "react";
import { getPrimaryTaskAction } from "../helpers/taskDetails/getPrimaryTaskAction";
import { canCompleteTask, canAcceptTask } from "../helpers/permissions";
import { useNavigate } from "react-router-dom";
import { useTasksStore } from "../store/tasksStore";
import { useCurrentUser } from "../helpers/useCurrentUser";

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
  const user = useCurrentUser();
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const navigate = useNavigate();

  const acceptTask = useTasksStore((state) => state.acceptTask);
  const completeTask = useTasksStore((state) => state.completeTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const primaryAction = task ? getPrimaryTaskAction(task) : null;

  if (!isOpen || !task) return null;

  const handleDeleteTask = async () => {
    const confirmed = window.confirm(
      "Удалить заявку без возможности восстановления?",
    );

    if (!confirmed) return;

    try {
      await deleteTask(task.id);
      onClose();
    } catch {
      alert("Не удалось удалить заявку");
    }
  };

  return (
    <Backdrop isOpen={isOpen} onClick={onClose} opacity={0.3}>
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
        <TaskHeader
          task={task}
          dragControls={dragControls}
          onEdit={() => navigate(`/edit-application/${task.id}`)}
          onDelete={handleDeleteTask}
        />

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

          {primaryAction === "accept" && canAcceptTask(user.role) && (
            <ActionButton
              className="mt-6"
              onClick={async () => {
                await acceptTask(task.id, user.id);
                onClose();
              }}
            >
              Взять в работу
            </ActionButton>
          )}

          {primaryAction === "complete" && canCompleteTask(user.role) && (
            <ActionButton
              className="mt-6"
              onClick={async () => {
                await completeTask(task.id);
                onClose();
              }}
            >
              Завершить работу
            </ActionButton>
          )}

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
    </Backdrop>
  );
};
