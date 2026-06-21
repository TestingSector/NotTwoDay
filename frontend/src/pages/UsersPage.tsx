import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import type { User } from "../types/user";
import { useCurrentUser } from "../helpers/useCurrentUser";
import { canManageUsers } from "../helpers/permissions";
import { Navigate } from "react-router-dom";

import { UserRow } from "../components/users/UserRow";

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const user = useCurrentUser();
  useEffect(() => {
    if (!canManageUsers(user.role)) {
      return;
    }

    getUsers().then(setUsers);
  }, [user.role]);

  if (!canManageUsers(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--color-shell)]">
      <header className="px-6 pb-8 pt-14">
        <h1 className="text-[32px] font-semibold tracking-[-0.03em] text-white">
          Пользователи
        </h1>

        <p className="mt-3 text-sm text-white/70">
          Управление пользователями системы
        </p>
      </header>

      <main className="flex-1 rounded-t-[var(--radius-lg)] bg-[var(--color-surface)] px-4 pt-4">
        {users.map((listUser) => (
          <UserRow key={listUser.id} user={listUser} />
        ))}
      </main>
    </div>
  );
};
