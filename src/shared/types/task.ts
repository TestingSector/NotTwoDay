export type TaskStatus =
  | "pending"
  | "active"
  | "completed";

export type Task = {
  id: string;

  title: string;
  gost: string;

  customer: string;

  createdAt: number;

  status: TaskStatus;

  executor?: string;

  isUrgent?: boolean;

  estimatedTime: string;
};