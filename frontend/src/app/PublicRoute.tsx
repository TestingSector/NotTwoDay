import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  console.log("PublicRoute", {
    user,
    isLoading,
  });
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
