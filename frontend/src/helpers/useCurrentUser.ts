import { useAuthStore } from "../store/authStore";

export const useCurrentUser = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    throw new Error("useCurrentUser used without authenticated user");
  }

  return user;
};
