import type { User } from "./userModel";
export interface BaseResponse {
  success: boolean;
  message?: string;
}
export interface UserResponse extends BaseResponse {
  data: User;
}
export interface RegisterPayload {
  name: string;
  email: string;
  username: string;
  dob?: string;
  gender?: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface ResendVerificationRegisterationPayload {
  email: string;
}
