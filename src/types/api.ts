// types/api.ts

// ============= Base Response =============

interface ApiResponse<T = void> {
  message: string;
  status: number;
  data?: T;
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

// Reset Password
export type ResetPasswordResponse = ApiResponse<void>;

// Forgot Password
export type ForgotPasswordResponse = ApiResponse<void>;

// Verify OTP
export type VerifyOTPResponse = ApiResponse<{
  userId: string;
  phone: string;
}>;

// Resend OTP
export type ResendOTPResponse = ApiResponse<{
  phone: string;
}>;
// ============= Error Type =============
export type ApiError = ApiResponse<undefined>;
