import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

const PUBLIC_ENDPOINTS = [
  "api/auth/login",
  "api/auth/register",
  "api/auth/login/forgot-password",
  "api/auth/login/verify-otp",
  "api/auth/login/resetpass",
];

api.interceptors.request.use(
  (config) => {
    const isPublic = PUBLIC_ENDPOINTS.some((url) =>
      config.url?.startsWith(url)
    );

    if (!isPublic) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
