import type { BaseResponse } from "./baseResponse";
import type { User } from "./userModel";

export interface UserResponse extends BaseResponse {
  data: User;
}
export interface RegisterPayload {
  name: string;
  email: string;
  username: string;
  dob?: Date | string;
  gender?: "male" | "female";
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

export interface SendOtpPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  code: string;
  newPassword: string;
}
