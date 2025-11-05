// lib/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    if (session?.user?.id) {
      config.headers.Authorization = `Bearer ${session.user.id}`;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("📤 Request:", config.url, config.data);
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle specific error codes
    // if (error.response?.status === 401) {
    //   // Redirect to login
    //   window.location.href = "/auth/login";
    // }
    // console.log("Axios Error: ", error);

    console.group("❌ Axios Error Details");
    console.log("1. Error Object:", error);
    console.log("2. Error Message:", error.message);
    console.log("3. Error Response:", error.response);
    console.log("4. Error Response Data:", error.response?.data);
    console.log("5. Error Response Status:", error.response?.status);
    console.log("6. Error Config:", error.config);
    console.groupEnd();

    return Promise.reject(error);
  }
);
