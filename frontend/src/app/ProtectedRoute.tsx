import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  console.log("ProtectedRoute", {
    user,
    isLoading,
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
