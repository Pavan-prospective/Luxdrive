import { apiClient } from "./client";

export interface SellerProfileResponse {
  id: number;
  user_id: number;
  seller_type: string;
  business_name: string | null;
  city: string;
  state: string;
  address: string;
  gst_number: string | null;
  verification_status: string;
  active_listing_limit: number;
  created_at: string;
}

export interface UpdateSellerProfileRequest {
  business_name?: string;
  city?: string;
  state?: string;
  address?: string;
  gst_number?: string;
}

export interface CreateSellerProfileRequest {
  seller_type: string;
  business_name: string;
  city: string;
  state: string;
  address: string;
  gst_number: string;
}

/**
 * Create a new seller profile
 * POST /api/v1/users/seller-profile
 */
export async function createSellerProfile(data: CreateSellerProfileRequest) {
  console.log("Create Seller Profile - Request Payload:", data);
  const response = await apiClient.post("/users/seller-profile", data);
  console.log("Create Seller Profile - Response:", response.data);
  return response.data;
}

/**
 * Fetch current authenticated user's seller profile
 * GET /api/v1/users/seller-profile
 */
export async function getSellerProfile(): Promise<SellerProfileResponse> {
  console.log("Get Seller Profile - Request Sent");
  const response = await apiClient.get("/users/seller-profile");
  console.log("Get Seller Profile - Response:", response.data);
  return response.data?.data || response.data;
}

/**
 * Update current authenticated user's seller profile
 * PUT /api/v1/users/seller-profile
 */
export async function updateSellerProfile(data: UpdateSellerProfileRequest) {
  console.log("Update Seller Profile - Request Payload:", data);
  const response = await apiClient.put("/users/seller-profile", data);
  console.log("Update Seller Profile - Response:", response.data);
  return response.data;
}
