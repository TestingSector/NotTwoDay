import type { DocumentType } from "./application";

export type TaskPayload = {
  creatorId: string;

  type: DocumentType;

  number?: string;

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
};
