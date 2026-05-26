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
    <nav className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-24px)] max-w-[380px] -translate-x-1/2 rounded-[28px] border border-white/10 bg-[rgba(250,245,236,0.88)] backdrop-blur-xl">
      <div className="flex items-center justify-around px-6 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-text-secondary)]"
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