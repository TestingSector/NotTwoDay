import { Outlet } from "react-router-dom";
import { BottomNav } from "../widgets/BottomNav";

export const Layout = () => {
  return (
    <div className="flex h-screen justify-center bg-[#233652]">
      <div className="relative flex h-screen w-full max-w-md overflow-hidden">
        <Outlet />

        <BottomNav />
      </div>
    </div>
  );
};