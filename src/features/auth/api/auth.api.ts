import { api } from "@/lib/axios";
import type {
  BaseResponse,
  LoginPayload,
  RegisterPayload,
  ResendVerificationRegisterationPayload,
  UserResponse,
  VerifyEmailPayload,
} from "@/types/authModel";

import type { User } from "@/types/userModel";

export async function getMeApi(): Promise<UserResponse> {
  const res = await api.get<{ success: boolean; data: User }>(
    "/api/v1/auth/me",
  );
  return res.data;
}
export async function registerApi(
  data: RegisterPayload,
): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/register", data);
  return res.data;
}
export async function loginApi(data: LoginPayload): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/login", data);
  return res.data;
}

export async function verifyRegistertionApi(
  data: VerifyEmailPayload,
): Promise<BaseResponse> {
  const res = await api.patch<BaseResponse>("/api/v1/auth/verify", data);
  return res.data;
}
export async function sendOtpApi(
  data: ResendVerificationRegisterationPayload,
  idempotency?: string,
): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>("/api/v1/auth/send-otp", data, {
    headers: {
      "idempotency-key": idempotency,
    },
  });
  return res.data;
}
export async function send2FACodeApi(
  data: ResendVerificationRegisterationPayload,
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
export async function verify2FAApi(
  data: VerifyEmailPayload,
): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>(
    "/api/v1/auth/verify-code-enable-2-step-verification",
    data,
  );
  return res.data;
}
export async function logoutApi(): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>("/api/v1/auth/logout");
  return res.data;
}
export async function verifyLoginApi(
  data: VerifyEmailPayload,
): Promise<UserResponse> {
  const res = await api.post<UserResponse>("/api/v1/auth/verify-login", data);
  return res.data;
}
