import { apiClient, authClient } from "./client";

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
}

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface UserResponse {
  id: string | number;
  full_name: string;
  email: string;
  phone: string;
  role?: string;
  is_active?: boolean;
  is_verified?: boolean;
  created_at?: string;
  last_login_at?: string | null;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
}

/**
 * Register a new user
 * POST /api/v1/auth/register
 */
export async function registerUser(data: RegisterRequest): Promise<{ success: boolean; message: string }> {
  console.log("Registering User - Request payload sent to backend:", data);
  const response = await apiClient.post("/auth/register", data);
  console.log("Registration Successful - Response received from backend:", response.data);
  return response.data;
}

/**
 * Login user
 * POST /api/v1/auth/login
 */
export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  console.log("Logging in User - Request payload sent to backend:", data);
  // The backend uses FastAPI OAuth2PasswordRequestForm, requiring form data and a 'username' field
  const formData = new URLSearchParams();
  if (data.email) formData.append("username", data.email);
  if (data.password) formData.append("password", data.password);

  const response = await apiClient.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log("Login Successful - Response received from backend:", response.data);
  return response.data;
}

/**
 * Refresh expired access token
 * POST /api/v1/auth/refresh
 */
export async function refreshToken(token: string): Promise<{ access_token: string; refresh_token?: string }> {
  const response = await authClient.post("/auth/refresh", { refresh_token: token });
  return response.data?.data || response.data;
}

/**
 * Logout current session
 * POST /api/v1/auth/logout
 */
export async function logoutUser(): Promise<{ success: boolean; message: string }> {
  const response = await apiClient.post("/auth/logout");
  return response.data;
}

/**
 * Fetch current authenticated user profile details
 * GET /api/v1/auth/me
 */
export async function getCurrentUser(): Promise<UserResponse> {
  const response = await apiClient.get("/auth/me");
  // Backend returns { success, message, data: { ... } }
  return response.data?.data || response.data;
}
