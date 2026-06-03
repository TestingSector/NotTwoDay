import { api } from "./api";
import type { TestMethod } from "../../features/application/model/types";

export const getTestMethods = async (): Promise<TestMethod[]> => {
  const response = await api.get("/test-methods");

  return response.data;
};
