import axios from "axios";
import { API_URL } from "../../utils/baseUrl";

export const axiosInstance = axios.create({
  baseURL: `${API_URL}`, // use env variable
  withCredentials: true,
});
