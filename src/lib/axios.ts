import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true, // required so cookies are sent and received
});

//  used only for refreshing
const refreshClient = axios.create({ baseURL, withCredentials: true });

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<void> | null = null;

const refresh = async () => {
  await refreshClient.post("/auth/refresh");
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;

    const isAuthRoute =
      original?.url?.includes("/auth/refresh") ||
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/logout");

    if (
      error.response?.status !== 401 ||
      !original ||
      original._retry ||
      isAuthRoute
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    try {
      refreshPromise ??= refresh().finally(() => {
        refreshPromise = null;
      });
      await refreshPromise;
      return api(original); // retry; browser now sends the new cookies
    } catch (refreshError) {
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(refreshError);
    }
  },
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Automatically throw just the message or a custom error object
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(errorMessage));
  },
);
