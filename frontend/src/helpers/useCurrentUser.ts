import { useAuthStore } from "../store/authStore";

export const useCurrentUser = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    throw new Error("Пользователь не авторизован");
  }

  return user;
};
