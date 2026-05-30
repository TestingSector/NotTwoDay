import type { User } from "./user";

export type TaskStatus = "pending" | "active" | "completed";

export type Task = {
  id: string;
  title: string;
  gost: string;
  createdAt: string;
  status: TaskStatus;
  isUrgent?: boolean;
  estimatedTime: string;
  creator: User;
  executor?: User | null;
  completedAt?: string | null;
};
