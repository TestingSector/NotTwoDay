import type { User } from "./user";

export type LoginRequest = {
  phoneNumber: string;
  password: string;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  middleName?: string;
  laboratory: string;
  phoneNumber: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
