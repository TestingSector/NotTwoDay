import { create } from "zustand";

import {
  getCurrentUser as getCurrentUserApi,
  login as loginApi,
  register as registerApi,
} from "../api/auth";

import type { User } from "../types/user";
import type { LoginFormData } from "../schemas/loginSchema";
import { devtools } from "zustand/middleware";
import type { RegisterFormData } from "../schemas/registerSchema";
type AuthStore = {
  user: User | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  loadCurrentUser: () => Promise<void>;
  setUser: (user: User) => void;
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
        localStorage.setItem("accessToken", accessToken);

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      register: async (data) => {
        const { user, accessToken } = await registerApi(data);

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
      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "AuthStore",
    },
  ),
);
