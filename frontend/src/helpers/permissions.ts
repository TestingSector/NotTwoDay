import type { UserRole } from "../types/user";

// actions
export const canCreateApplication = (role: UserRole) =>
  role === "developer" || role === "dispatcher" || role === "admin";

export const canEditApplication = (role: UserRole) =>
  role === "dispatcher" || role === "admin";

export const canDeleteApplication = (role: UserRole) =>
  role === "dispatcher" || role === "admin";

export const canAcceptTask = (role: UserRole) =>
  role === "tester" || role === "admin";

export const canCompleteTask = (role: UserRole) =>
  role === "tester" || role === "admin";

export const canManageUsers = (role: UserRole) => role === "admin";

// views
export const canViewTaskDetails = (role: UserRole) => role !== "guest";

export const canViewMyTasks = (role: UserRole) =>
  role === "developer" || role === "tester" || role === "admin";

export const canViewHistory = (role: UserRole) =>
  role === "tester" || role === "dispatcher" || role === "admin";
