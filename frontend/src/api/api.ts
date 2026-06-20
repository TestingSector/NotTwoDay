import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://192.168.200.208:3000",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? "Произошла ошибка";

    toast.error(message);

    return Promise.reject(error);
  },
);
