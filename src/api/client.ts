import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://212.38.94.210/api/v1";

// Primary API Client
export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("ENV API URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("Axios Base URL:", baseURL);
// Dedicated Auth Client for token operations (prevents interceptor recursion)
export const authClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Inject Access Token dynamically from localStorage
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason: any) => void;
}> = [];

// Helper to resolve/reject queued requests
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Catch 401 Unauthorized and execute background Token Refresh Flow
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if unauthorized, not already retried, and is a valid network request
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Enqueue current request and wait for the refresh process to complete
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshTokenVal = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
        if (!refreshTokenVal) {
          throw new Error("No refresh token available");
        }

        // Call silent refresh endpoint using dedicated client
        const response = await authClient.post("/auth/refresh", {
          refresh_token: refreshTokenVal,
        });

        // Defensively handle both direct token responses and wrapped responses { data: { access_token... } }
        const payload = response.data?.data || response.data;
        const { access_token, refresh_token: newRefreshToken } = payload;

        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", access_token);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
          // Dispatch custom window event to synchronize React Auth Context state
          window.dispatchEvent(new Event("auth-token-refreshed"));
        }

        // Set default header and update retry request
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        processQueue(null, access_token);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Token refresh failed completely - clear state and dispatch global logout signal
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("currentUser");
          window.dispatchEvent(new Event("auth-unauthorized"));
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
