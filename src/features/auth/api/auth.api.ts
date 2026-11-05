import { api } from "@/lib/axios";
import type { TforgotPasswordData } from "@/types/forgotPasswordData";
import type { TloginFormData } from "@/types/loginFormData";
import type { TRegisterData } from "@/types/registerData";
import type { User } from "@/types/User";
import type { TverifyOtpData } from "@/types/verifyOtpData";
interface BaseResponse {
  success: boolean;
  message?: string;
}
interface UserResponse extends BaseResponse {
  data: User;
}
export async function getMeApi() {
  const res = await api.get<{ success: boolean; data: User }>("/auth/me");
  console.log(res.data);
  return res.data;
}
export async function registerApi(data: TRegisterData) {
  const res = await api.post<UserResponse>("/auth/register", data);
  return res.data;
}
export async function loginApi(data: TloginFormData) {
  const res = await api.post<UserResponse>("/auth/login", data);
  return res.data;
}

export async function verifyRegistertionApi(data: TverifyOtpData) {
  const res = await api.patch<BaseResponse>("/auth/verify", data);
  return res.data;
}
export async function sendOtpApi(
  data: TforgotPasswordData,
  idempotency?: string,
) {
  const res = await api.post<BaseResponse>("/auth/send-otp", data, {
    headers: {
      "idempotency-key": idempotency,
    },
  });

  return res.data;
}
export async function logoutApi() {
  const res = await api.post<BaseResponse>("/auth/logout");

  return res.data;
}

export function verifyLoginApi() {}
