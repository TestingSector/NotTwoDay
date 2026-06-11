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
    <div className="flex h-screen justify-center bg-[var(--color-shell)]">
      <div className="relative flex h-screen w-full max-w-md overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
