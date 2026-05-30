import { api } from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};

export const createTask = async (task: {
  title: string;
  gost: string;
  estimatedTime: string;
  isUrgent: boolean;
  creatorId: string;
}) => {
  const response = await api.post("/tasks", task);

  return response.data;
};
