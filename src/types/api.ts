// types/api.ts

// ============= Base Response =============

export interface ApiResponse<T = void> {
  messageKey?: string;
  message: string;
  status: number;
  data?: T;
}

// ============= Error Type =============
export interface ApiErrorResponse {
  message: string;
  messageKey?: string;
  status: number;
  errors?: Record<string, string[]>;
}

// ============= Auth Response Types =============

// Register
export type RegisterResponse = ApiResponse<{
  _id: string;
  name: string;
  email?: string;
  requiresOTP?: boolean;
}>;

// Login (if needed)
export type LoginResponse = ApiResponse<{
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}>;

// Verify Email
export type VerifyEmailResponse = ApiResponse<{
  userId: string;
  email: string;
}>;


// Verify OTP
export type VerifyOTPResponse = ApiResponse<{
  userId: string;
  phone: string;
}>;

// Resend OTP
export type ResendOTPResponse = ApiResponse<{
  phone: string;
}>;
