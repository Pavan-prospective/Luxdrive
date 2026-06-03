"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getCurrentUser, logoutUser, UserResponse, LoginRequest } from "@/api/auth";
import { apiClient } from "@/api/client";

interface AuthContextType {
  user: UserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenState, setRefreshTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 1. Initial State Hydration: restore session on mount (refresh)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");
        const storedUser = localStorage.getItem("currentUser");

        if (storedAccessToken && storedRefreshToken) {
          setAccessToken(storedAccessToken);
          setRefreshTokenState(storedRefreshToken);
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;

          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // Fetch current user from server if not cached
            const profile = await getCurrentUser();
            setUser(profile);
            localStorage.setItem("currentUser", JSON.stringify(profile));
          }
        }
      } catch (err) {
        console.error("Failed to restore authenticating session:", err);
        // Purge corrupted values
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentUser");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // 2. React to background Axios events (keeps state in sync on token refreshes/expiration)
  useEffect(() => {
    const handleBackgroundRefresh = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      setAccessToken(storedAccessToken);
      setRefreshTokenState(storedRefreshToken);
      
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    const handleBackgroundUnauthorized = () => {
      setUser(null);
      setAccessToken(null);
      setRefreshTokenState(null);
      router.push("/auth/login");
    };

    window.addEventListener("auth-token-refreshed", handleBackgroundRefresh);
    window.addEventListener("auth-unauthorized", handleBackgroundUnauthorized);

    return () => {
      window.removeEventListener("auth-token-refreshed", handleBackgroundRefresh);
      window.removeEventListener("auth-unauthorized", handleBackgroundUnauthorized);
    };
  }, [router]);

  // 3. User Login
  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const data = await loginUser(credentials);
      
      // Set the authorization header so getCurrentUser can succeed
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
      
      // Fetch user profile since the real /auth/login only returns tokens
      const profile = await getCurrentUser();

      setAccessToken(data.access_token);
      setRefreshTokenState(data.refresh_token);
      setUser(profile);

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      localStorage.setItem("currentUser", JSON.stringify(profile));

      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Global Logout
  const logout = async () => {
    setIsLoading(true);
    try {
      // Best-effort API call, ignore errors to guarantee UI signs out regardless
      await logoutUser().catch((err) => console.warn("API logout call failed:", err));
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshTokenState(null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");

      delete apiClient.defaults.headers.common["Authorization"];

      router.push("/auth/login");
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken: refreshTokenState,
        isAuthenticated: !!accessToken,
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
