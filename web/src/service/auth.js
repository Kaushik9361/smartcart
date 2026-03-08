import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
});
export const register = (data) => API.post("/auth/register", data);

export const login = (data) => API.post("/auth/login", data);