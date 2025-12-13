import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_HOST = `${process.env.BACKEND}/api`;
const API_KEY = process.env.API_KEY;
const TOKEN = process.env.AUTH_TOKEN!;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach headers dynamically
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (API_KEY) {
      config.headers["Authorization"] = `Bearer ${API_KEY}`;
    }

    const AuthToken = Cookies.get(TOKEN);

    if (AuthToken) {
      config.headers["Authorization-Customer"] = `Bearer ${AuthToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
