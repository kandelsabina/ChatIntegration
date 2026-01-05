"use client";

import axios from "axios";
import Cookies from "js-cookie";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  
  };
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export const axiosInstance = axios.create({
  baseURL: "https://elitesapp.eliteslogistics.com.np/api",
  timeout: 15000,
});

let isRefreshing = false;

// 🔹 Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor with refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const response = await axiosInstance.post<RefreshResponse>(
          "/auth/refresh-token",
          { refreshToken }
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        Cookies.set("access_token", newAccessToken, { expires: 7 });
        Cookies.set("refresh_token", newRefreshToken, { expires: 7 });

        if (!originalRequest.headers) originalRequest.headers = {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 🔹 Typed login helper
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};
