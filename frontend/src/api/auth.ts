import { api } from "./api";

import type { LoginFormData } from "../schemas/loginSchema";

export const login = async (credentials: LoginFormData) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};
