import { api } from "@/lib/axios";
import type {
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  SendOtpPayload,
  UserResponse,
  VerifyEmailPayload,
} from "@/types/authModel";
import type { BaseResponse } from "@/types/baseResponse";

import type { User } from "@/types/userModel";
//get user information
export async function getMeApi(): Promise<UserResponse> {
  const res = await api.get<{ success: boolean; data: User }>(
    "/api/v1/auth/me",
  );
  return res.data;
}

//register new user
export async function registerApi(
  data: RegisterPayload,
): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/register", data);
  return res.data;
}

//login  user or send login code depending on user existence in response
export async function loginApi(data: LoginPayload): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/login", data);
  return res.data;
}

//resend new otp or resend forgot password otp code
export async function sendOtpApi(
  data: SendOtpPayload,
  idempotency?: string,
): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>("/api/v1/auth/send-otp", data, {
    headers: {
      "idempotency-key": idempotency,
    },
  });
  return res.data;
}

//send two-factor authentication code to user email
export async function send2FACodeApi(
  data: SendOtpPayload,
  idempotency?: string,
): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>(
    "/api/v1/auth/enable-2-step-verification",
    data,
    {
      headers: {
        "idempotency-key": idempotency,
      },
    },
  );
  return res.data;
}
//verify two-factor authentication login code
export async function verifyLoginApi(
  data: VerifyEmailPayload,
): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/verify-login", data);
  return res.data;
}

//verify new users
export async function verifyRegistertionApi(
  data: VerifyEmailPayload,
): Promise<BaseResponse> {
  const res = await api.patch<BaseResponse>("/api/v1/auth/verify", data);
  return res.data;
}

//verify two-factor authentication code to enable 2-step verification
export async function verify2FAApi(
  data: VerifyEmailPayload,
): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>(
    "/api/v1/auth/verify-code-enable-2-step-verification",
    data,
  );
  return res.data;
}

//logout user
export async function logoutApi(): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>("/api/v1/auth/logout");
  return res.data;
}
//reset password
export async function resetPasswordApi(
  data: ResetPasswordPayload,
  idempotency?: string,
): Promise<BaseResponse> {
  const res = await api.patch<BaseResponse>(
    "/api/v1/auth/reset-password",
    data,
    {
      headers: {
        "idempotency-key": idempotency,
      },
    },
  );
  return res.data;
}
