import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { useCurrentUser } from "../helpers/useCurrentUser";
import { useAuthStore } from "../store/authStore";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const user = useCurrentUser();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    toast.success("Вы вышли из системы");

    navigate("/auth", { replace: true });
  };

  const fullName = [user.lastName, user.firstName, user.middleName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="min-h-[100dvh] bg-[var(--color-shell)]">
      <div className="p-4">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
      </div>

      <div className="rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] p-6">
        <h1 className="mb-6 text-xl font-semibold">Профиль</h1>

        <div className="space-y-4">
          <div>
            <p>ФИО</p>
            <p>{fullName}</p>
          </div>

          <div>
            <p>Телефон</p>
            <p>{user.phoneNumber}</p>
          </div>

          <div>
            <p>Лаборатория</p>
            <p>{user.laboratory}</p>
          </div>

          <div>
            <p>Роль</p>
            <p>{user.role}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="mt-8 w-full">
          Выйти
        </button>
      </div>
    </div>
  );
};
