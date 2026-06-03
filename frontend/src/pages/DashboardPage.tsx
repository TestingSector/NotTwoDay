import { TasksOverview } from "../components/dashboard/TasksOverview";
import { TestCard } from "../components/shared/TestCard";
import { useState, useEffect } from "react";
import { currentUser } from "../shared/mocks/currentUser";
import { getTasks } from "../shared/api/tasks";
import { getDashboardTasks } from "../shared/lib/tasks";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((data) => {
        console.log("TASKS FROM API", data);

        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[var(--color-shell)]">
      <div className="shrink-0 px-4 pt-6">
        <TasksOverview />
      </div>
      <Link
        to="/create-application"
        className="mx-4 mt-4 block rounded bg-black px-4 py-3 text-center text-white"
      >
        Создать заявку
      </Link>
      <section className="mx-4 mt-4 flex min-h-0 flex-1 flex-col rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-6 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-28">
          {getDashboardTasks(tasks, currentUser).map((task, index) => (
            <TestCard key={task.id} task={task} isFirst={index === 0} />
          ))}
        </div>
      </section>
    </div>
  );
};
