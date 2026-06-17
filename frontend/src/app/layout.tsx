import { Outlet } from "react-router-dom";
import { useTasksStore } from "../store/tasksStore";
import { useEffect } from "react";
import { useReferenceStore } from "../store/referenceStore";

export const Layout = () => {
  const loadTasks = useTasksStore((state) => state.loadTasks);
  const loadTestMethods = useReferenceStore((state) => state.loadTestMethods);

  useEffect(() => {
    loadTestMethods();
    loadTasks();
  }, [loadTestMethods, loadTasks]);

  return (
    <div className="flex min-h-[100dvh] justify-center bg-[var(--color-shell)]">
      <div className="relative min-h-[100dvh] w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};
