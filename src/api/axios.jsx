import axios from "axios";

// Hardcode the production URL as fallback
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("🔗 API URL:", BASE_URL);

const API = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token
API.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;