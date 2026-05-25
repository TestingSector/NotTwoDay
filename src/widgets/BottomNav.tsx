import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Мои",
    path: "/",
  },
  {
    label: "Очередь",
    path: "/queue",
  },
  {
    label: "Профиль",
    path: "/profile",
  },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-md items-center justify-around px-6 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-secondary)]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};