import { create } from "zustand";

import { login as loginApi } from "../api/authApi";

import type { User } from "../types/user";
import type { LoginFormData } from "../schemas/loginSchema";

type AuthStore = {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;

  login: (credentials: LoginFormData) => Promise<void>;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  isAuthenticated: false,

  login: async (credentials) => {
    const { user, token } = await loginApi(credentials);

    sessionStorage.setItem("token", token);

    set({
      user,
      token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    sessionStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
