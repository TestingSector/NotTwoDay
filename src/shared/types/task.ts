export type TaskStatus =
  | "pending"
  | "active"
  | "completed";

export type Task = {
  id: string;
  title: string;
  gost: string;
  createdAt: number;
  status: TaskStatus;
  isUrgent?: boolean;
  estimatedTime: string;
  creatorId: string;
  executorId?: string;
};