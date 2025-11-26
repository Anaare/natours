import axios from "axios";

// Create a centralized axios instance with credentials enabled by default
export const axiosInstance = axios.create({
  withCredentials: true, // Automatically send cookies with every request
  baseURL: "/api/v1", // Base URL for all requests
});

export default axiosInstance;
