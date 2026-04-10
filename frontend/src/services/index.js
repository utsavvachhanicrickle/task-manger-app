import axios from "axios";
import { APIENDPOINTS } from "../utils/apiEndPoints.js";

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, 
});

// ---------- Refresh Token Logic ----------
let isRefreshing = false; 
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  failedQueue = [];
};

// Response interceptor to handle 401 (access token expired)
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Only retry once and skip refresh for refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(APIENDPOINTS.REFRESHTOKEN)
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request while token is refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve: () => resolve(API(originalRequest)), reject });
        });
      }

      isRefreshing = true;
      return new Promise(async (resolve, reject) => {
        try {
          await API.get(APIENDPOINTS.REFRESHTOKEN); 
          processQueue();
          resolve(API(originalRequest)); 
        } catch (err) {
          processQueue(err);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);


export default API;