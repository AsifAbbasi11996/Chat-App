import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL, // use env variable
  withCredentials: true,
});
