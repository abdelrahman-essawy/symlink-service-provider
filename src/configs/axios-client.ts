import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/v1/admin/" // API URL,
  baseURL: "http://164.90.181.17:3000/v1/", // API SERVER URL,
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
};

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = window.sessionStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}` ?? undefined;
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  (error: any) => {
    if (error.response.status === 401) {
      redirect("/auth/login");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
