// src/api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tienda-cursos-django-react-2-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Interceptor para agregar el token a cada request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Interceptor para manejar refresh token si el accessToken ha expirado
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://tienda-cursos-django-react-2-production.up.railway.app/api/users/token/refresh/",
          {
            refresh: localStorage.getItem("refreshToken"),
          }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
