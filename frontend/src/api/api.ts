import axios from "axios";

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
