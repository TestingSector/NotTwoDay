import { NavLink } from "react-router-dom";
import { LayoutList, BriefcaseBusiness } from "lucide-react";

const navItems = [
  {
    label: "Загрузка",
    path: "/",
    icon: LayoutList,
  },
  {
    label: "Мои",
    path: "/tasks",
    icon: BriefcaseBusiness,
  },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-md items-center px-2 py-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 px-2 py-2 transition-colors ${
                  index !== navItems.length - 1
                    ? "border-r border-[var(--color-border)]"
                    : ""
                } ${
                  isActive
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)]"
                }`
              }
            >
              <Icon size={17} strokeWidth={2} />

              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
