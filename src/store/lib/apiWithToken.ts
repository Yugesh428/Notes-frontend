/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL: "https://pustakalaya-api.onrender.com/api/",
  headers: {
    Accept: "application/json",
  },
});

APIWITHTOKEN.interceptors.request.use(
  (config: any) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers = config.headers || {};
      // Logic: Send the raw token string as your backend expects
      config.headers.authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default APIWITHTOKEN;
