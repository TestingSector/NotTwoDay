import { create } from "zustand";

import {
  getCurrentUser as getCurrentUserApi,
  login as loginApi,
} from "../api/auth";

import type { User } from "../types/user";
import type { LoginFormData } from "../schemas/loginSchema";
import { devtools } from "zustand/middleware";
type AuthStore = {
  user: User | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginFormData) => Promise<void>;

  loadCurrentUser: () => Promise<void>;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,

      login: async (credentials) => {
        const { user, accessToken } = await loginApi(credentials);
        console.log("LOGIN RESPONSE", user, accessToken);
        localStorage.setItem("accessToken", accessToken);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      loadCurrentUser: async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          set({
            isLoading: false,
          });

          return;
        }

        try {
          const user = await getCurrentUserApi();

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          localStorage.removeItem("accessToken");

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
      logout: () => {
        localStorage.removeItem("accessToken");

        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "AuthStore",
    },
  ),
);
