export type UserRole =
  | "guest"
  | "customer"
  | "dispatcher"
  | "engineer"
  | "admin";

export type User = {
  id: string;

  firstName: string;
  lastName: string;
  middleName?: string;

  laboratory: string;

  role: UserRole;

  phoneNumber: string;

  email?: string;

  createdAt: number;

  isApproved: boolean;
};