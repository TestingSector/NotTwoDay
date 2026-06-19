import { ArrowLeft, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../helpers/useCurrentUser";
import { useAuthStore } from "../store/authStore";

type ProfileFieldProps = {
  label: string;
  value: string;
};

const ProfileField = ({ label, value }: ProfileFieldProps) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-[var(--color-text-secondary)]">
      {label}
    </p>

    <p className="mt-1 text-base font-medium text-[var(--color-shell)]">
      {value}
    </p>
  </div>
);

export const ProfilePage = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--color-shell)]">
      <header className="shrink-0 px-6 pb-8 pt-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-full p-2 text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
            Профиль
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto rounded-t-[32px] bg-[var(--color-surface)] px-4 py-6">
        <section className="rounded-[24px] bg-[var(--color-surface-secondary)] p-6">
          <div className="flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <User size={40} className="text-white" />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[var(--color-shell)]">
              {user.firstName} {user.lastName}
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Лаборатория №{user.laboratory}
            </p>

            <span className="mt-3 rounded-full bg-[var(--color-shell)] px-3 py-1 text-xs text-white">
              {user.role}
            </span>
          </div>
        </section>

        <section className="mt-5 rounded-[24px] border border-[var(--color-border)] p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
            Информация
          </h3>

          <div className="space-y-4">
            <ProfileField label="Фамилия" value={user.lastName} />
            <ProfileField label="Имя" value={user.firstName} />
            <ProfileField
              label="Отчество"
              value={user.middleName || "Не указано"}
            />
            <ProfileField label="Телефон" value={user.phoneNumber} />
            <ProfileField label="Лаборатория" value={`№${user.laboratory}`} />
            <ProfileField label="Роль" value={user.role} />
          </div>
        </section>

        <button
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[20px] bg-[var(--color-accent)] py-4 font-semibold text-white"
        >
          <LogOut size={18} />
          Выйти из аккаунта
        </button>
      </main>
    </div>
  );
};
