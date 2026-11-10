import { api } from "@/lib/axios";
import type { UserResponse } from "@/types/authModel";
import type { BaseResponse } from "@/types/baseResponse";
import type { User } from "@/types/userModel";

export const getProfileApi = async (
  username: string,
): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/api/v1/user/${username}`);
  return response.data;
};
export const updateProfileApi = async (
  data: Partial<User>,
): Promise<UserResponse> => {
  const response = await api.put<UserResponse>(`/api/v1/user/me`, data);
  return response.data;
};
export const updatePasswordApi = async (data: {
  password: string;
  newPassword: string;
}): Promise<BaseResponse> => {
  const response = await api.patch<BaseResponse>(
    `/api/v1/user/update-password`,
    data,
  );
  return response.data;
};
export const uploadProfilePicctureApi = async (
  file: FormData,
): Promise<BaseResponse> => {
  const response = await api.post<BaseResponse>(
    `/api/v1/user/upload-profile-picture`,
    file,
  );
  return response.data;
};
export const uploadCoverPictureApi = async (
  file: FormData,
): Promise<BaseResponse> => {
  const response = await api.post<BaseResponse>(
    `/api/v1/user/upload-cover-picture`,
    file,
  );
  return response.data;
};

export const deactivateProfileApi = async (): Promise<string> => {
  await api.delete<void>(`/api/v1/user/me`);
  return "user deleted successfully";
};
