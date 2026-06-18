import { api } from "./api";

import type { LoginFormData } from "../schemas/loginSchema";
import type { RegisterFormData } from "../schemas/registerSchema";

export const login = async (credentials: LoginFormData) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};
export const register = async (data: RegisterFormData) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};
