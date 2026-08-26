import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {

    // Don't attach JWT for login/register
    if (
        config.url.includes("accounts/login") ||
        config.url.includes("accounts/register") ||
        config.url.includes("accounts/forgot-password") ||
        config.url.includes("accounts/verify-otp") ||
        config.url.includes("accounts/reset-password")
    ) {
        return config;
    }

    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;