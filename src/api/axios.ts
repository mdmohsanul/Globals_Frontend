import axios, { AxiosError } from "axios";
import type{ AxiosRequestConfig } from "axios";



const BASE_URL = "http://localhost:4000/api/v1"
   
// const BASE_URL =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:4000/api/v1"
//     : "";



const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for cookies
});

// Flag to avoid infinite loops
let isRefreshing = false;
let failedRequestsQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];


// REQUEST INTERCEPTOR

api.interceptors.request.use((config) => {
  
  return config;
});


// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing → queue requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // Otherwise, refresh token now
      isRefreshing = true;

      try {
        await api.post("/auth/refresh"); // backend sets new cookies

        // Retry queued requests
        failedRequestsQueue.forEach((req) => req.resolve());
        failedRequestsQueue = [];

        return api(originalRequest);
      } catch (refreshError) {
        failedRequestsQueue.forEach((req) => req.reject(refreshError));
        failedRequestsQueue = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
