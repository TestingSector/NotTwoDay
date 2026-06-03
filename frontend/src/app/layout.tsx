import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/shared/BottomNav";

export const Layout = () => {
  return (
    <div className="flex h-screen justify-center bg-[var(--color-shell)]">
      <div className="relative flex h-screen w-full max-w-md overflow-hidden">
        <Outlet />

        <BottomNav />
      </div>
    </div>
  );
};
