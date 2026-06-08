import type { User } from "./user";
import type { DocumentType } from "./application";
export type TaskStatus = "pending" | "active" | "completed";

export type Task = {
  id: string;

  type: DocumentType;
  number: string;

  materialName: string;
  topic?: string;

  testMethod: string;
  standard: string;

  temperatureConditions: {
    temperature: number;
    quantity: number;
    modulus: boolean;
  }[];

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
