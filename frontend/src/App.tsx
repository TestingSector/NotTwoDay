// App.tsx

import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";
import { useAuthStore } from "./store/authStore";

export const App = () => {
  const loadCurrentUser = useAuthStore((state) => state.loadCurrentUser);

  useEffect(() => {
    void loadCurrentUser();
  }, [loadCurrentUser]);

  return <RouterProvider router={router} />;
};
