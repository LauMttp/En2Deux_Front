import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api",
  withCredentials: true,
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default service;
