import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
// import { redirect } from "next/navigation";

const axiosClient = axios.create({
  baseURL: process.env.API_URL, // API SERVER URL,
  withCredentials:false,  
});

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  "Accept-Language": 'en',
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

};

// axiosClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig<any>) => {
//     const token = window.sessionStorage.getItem("token");
//     config.headers.Authorization = token ?? undefined;
//     return config;
//   },
//   (error: any) => Promise.reject(error)
// );

// axiosClient.interceptors.response.use(
//   (response: AxiosResponse<any, any>) => response,
//   (error: any) => {
//     if (error?.response?.status === 401) {
//       redirect("/auth/login");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;