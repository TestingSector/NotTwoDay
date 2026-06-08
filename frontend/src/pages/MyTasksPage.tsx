import { Search } from "lucide-react";
import { currentUser } from "../data/user/currentUser";
import { getMyTasks } from "../helpers/task";
import { useState, useEffect } from "react";
import { acceptTask, completeTask, getTasks } from "../api";
import { TaskList } from "../components/shared/TaskList";
export const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const loadTasks = async () => {
    const data = await getTasks();

    setTasks(data);
  };
  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAcceptTask = async (taskId: string, executorId: string) => {
    try {
      await acceptTask(taskId, executorId);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <header className="px-6 pb-8 pt-14">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Мои задачи
        </h1>

        <p className="mt-3 text-sm font-medium text-white/70">
          12 активных задач
        </p>
      </header>

      <main className="flex-1 overflow-y-auto rounded-t-[var(--radius-lg)] bg-[var(--color-surface)]">
        <section className="px-4 pt-5">
          <div className="flex items-center gap-3 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3">
            <Search
              size={18}
              strokeWidth={2}
              className="text-[var(--color-text-secondary)]"
            />

            <input
              type="text"
              placeholder="Поиск задач"
              className="w-full bg-transparent text-[14px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-secondary)]"
            />
          </div>

          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            <button className="shrink-0 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-[12px] font-medium text-[var(--color-text)]">
              Статус
            </button>

            <button className="shrink-0 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-[12px] font-medium text-[var(--color-text)]">
              Испытатель
            </button>

            <button className="shrink-0 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-[12px] font-medium text-[var(--color-text)]">
              ГОСТ
            </button>
          </div>
        </section>

        <section className="flex-1 overflow-y-auto px-4 pb-28 pt-6">
          <TaskList
            tasks={getMyTasks(tasks, currentUser)}
            onAcceptTask={handleAcceptTask}
            onCompleteTask={handleCompleteTask}
          />
        </section>
      </main>
    </div>
  );
};
