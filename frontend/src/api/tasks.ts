import { api } from "./api";

export const getTasks = async () => {
  const response = await api.get("/tasks");

  return response.data;
};

export const createTask = async (task: unknown) => {
  const response = await api.post("/tasks", task);

  return response.data;
};
export const acceptTask = async (taskId: string, executorId: string) => {
  const response = await api.patch(`/tasks/${taskId}/accept`, {
    executorId,
  });

  return response.data;
};

export const completeTask = async (taskId: string) => {
  const response = await api.patch(`/tasks/${taskId}/complete`);

  return response.data;
};
