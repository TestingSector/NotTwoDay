import type { Task } from "../types/task";
import { DockIcon, Package, LucideClockAlert } from "lucide-react";

import {
  TaskComments,
  TaskHeader,
  TaskHistory,
  TaskInformation,
  TemperatureConditionsCard,
} from "../components/taskDetails";
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

  return (
    <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 left-0 right-0 h-[95dvh] overflow-y-auto rounded-t-[32px] bg-[var(--color-surface)]"
      >
        <TaskHeader task={task} />
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
          <TaskHistory task={task} />
        </main>
      </div>
    </div>
  );
};
