import { api } from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};

export const createTask = async (task: unknown) => {
  const response = await api.post("/tasks", task);

  return response.data;
};