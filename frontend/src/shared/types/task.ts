import type { User } from "./user";

export type TaskStatus = "pending" | "active" | "completed";

export type TemperatureCondition = {
  temperature: number;
  quantity: number;
  modulus: boolean;
};

export type Task = {
  id: string;

  type: string;
  number: string;

  materialName: string;
  topic?: string;

  testMethod: string;
  standard: string;

  temperatureConditions: TemperatureCondition[];

  isUrgent: boolean;
  urgentReason?: string;

  comment?: string;

  status: TaskStatus;

  creator: User;
  executor?: User | null;

  createdAt: string;
  acceptedAt?: string | null;
  completedAt?: string | null;
};