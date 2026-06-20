import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.200.208:3000",
});
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
