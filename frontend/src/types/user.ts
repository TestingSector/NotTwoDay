export type UserRole =
  | "guest"
  | "developer"
  | "dispatcher"
  | "tester"
  | "admin";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  laboratory: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: string;
};
