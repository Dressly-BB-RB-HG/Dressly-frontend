import axios from "axios";

export const myAxios = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
    },
});

myAxios.interceptors.request.use(
    (config) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
      }
      return config;
    },
    (error) => {
      // Hiba esetén írjuk ki a hibát, vagy végezzünk hibakezelést
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );