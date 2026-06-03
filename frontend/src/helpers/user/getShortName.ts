import type { User } from "../../types/user";

export const getShortName = (user: User) => {
  return `${user.lastName} ${user.firstName[0]}.${user.middleName?.[0] ?? ""}.`;
};
