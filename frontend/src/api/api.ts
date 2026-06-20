import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: "http://192.168.200.208:3000",
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? "Произошла ошибка";

    toast.error(message);

    return Promise.reject(error);
  },
);
