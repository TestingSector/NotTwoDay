import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import type { Task } from "../../types/task";
import { getShortName } from "../../helpers/user";

type TaskHistoryProps = {
  task: Task;
  onOpenHistory?: () => void;
};

export const TaskHistory = ({ task, onOpenHistory }: TaskHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const historyItems = [
    {
      title: "Создана",
      user: getShortName(task.creator),
      date: task.createdAt,
    },

    ...(task.acceptedAt && task.executor
      ? [
          {
            title: "Взята в работу",
            user: getShortName(task.executor),
            date: task.acceptedAt,
          },
        ]
      : []),

    ...(task.completedAt && task.executor
      ? [
          {
            title: "Завершена",
            user: getShortName(task.executor),
            date: task.completedAt,
          },
        ]
      : []),
  ];

  return (
    <div
      className="mt-6 rounded-[24px] bg-[var(--color-surface)] p-5"
      style={{
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <button
        onClick={() => {
          const nextState = !isOpen;
          setIsOpen(nextState);

          if (nextState) {
            onOpenHistory?.();
          }
        }}
        className="flex w-full items-center justify-between"
      >
        <h2 className="text-xl font-semibold text-[var(--color-shell)]">
          История заявки
        </h2>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.1,
          }}
        >
          <ChevronDown className="text-[var(--color-shell)]" size={20} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
        className="overflow-hidden"
      >
        <div className="mt-3">
          {historyItems.map((item, index) => {
            const isLast = index === historyItems.length - 1;

            return (
              <div
                key={`${item.title}-${index}`}
                className="grid grid-cols-[24px_1fr] gap-3"
              >
                <div className="relative flex justify-center">
                  <div
                    className={`z-10 rounded-full bg-[var(--color-success)] ${
                      isLast ? "h-4 w-4" : "h-3.5 w-3.5"
                    }`}
                  />

                  {!isLast && (
                    <div className="absolute bottom-[-12px] left-1/2 top-3 w-[3px] -translate-x-1/2 bg-[var(--color-success)]" />
                  )}
                </div>

                <div className={!isLast ? "pb-3" : ""}>
                  <p className={isLast ? "font-bold" : "font-semibold"}>
                    {item.title}
                  </p>

                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {item.user}
                  </p>

                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {new Date(item.date).toLocaleString("ru-RU")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
