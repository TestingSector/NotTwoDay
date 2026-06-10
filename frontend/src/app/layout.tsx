import { Outlet } from "react-router-dom";
import { useTasksStore } from "../store/tasksStore";
import { useEffect } from "react";

export const Layout = () => {
  const loadTasks = useTasksStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  return (
    <div className="flex h-screen justify-center bg-[var(--color-shell)]">
      <div className="relative flex h-screen w-full max-w-md overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
