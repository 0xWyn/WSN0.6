import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

let isRefreshing = false;
let refreshQueue = [];

API.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status !== 401) {
            return Promise.reject(err);
        }

        if (originalRequest._retry) {
            return Promise.reject(err);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({ resolve, reject });
            }).then(() => {
                return API(originalRequest);
            });
        }

        isRefreshing = true;

        try {
            await API.post("/auth/refresh");

            refreshQueue.forEach((p) => p.resolve());
            refreshQueue = [];

            return API(originalRequest);
        } catch (error) {
            refreshQueue.forEach((p) => p.reject(error));
            refreshQueue = [];

            window.dispatchEvent(new Event("auth:logout"));

            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    }
);
export default API;
