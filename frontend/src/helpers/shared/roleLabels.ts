import type { UserRole } from "../../types/user";

export const roleLabels: Record<UserRole, string> = {
  guest: "Гость",
  developer: "Разработчик",
  dispatcher: "Диспетчер",
  tester: "Испытатель",
  admin: "Администратор",
};
