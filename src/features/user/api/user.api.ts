import { api } from "@/lib/axios";
import type { User } from "@/types/userModel";

export const getProfileApi = async (username: string) => {
  const response = await api.get<{ success: boolean; data: User }>(
    `/api/v1/user/${username}`,
  );
  return response.data;
};
export const updateProfileApi = async (data: Partial<User>) => {
  const response = await api.put<{
    success: boolean;
    message: string;
    data: User;
  }>(`/api/v1/user/me`, data);
  return response.data;
};
export const updatePasswordApi = async (data: {
  password: string;
  newPassword: string;
}) => {
  const response = await api.patch<{
    success: boolean;
    message: string;
  }>(`/api/v1/user/update-password`, data);
  return response.data;
};
export const uploadProfilePicctureApi = async (file: FormData) => {
  console.log(file);
  const response = await api.post<{
    success: boolean;
    message: string;
  }>(`/api/v1/user/upload-profile-picture`, file);
  return response.data;
};
export const uploadCoverPictureApi = async (file: FormData) => {
  const response = await api.post<{
    success: boolean;
    message: string;
  }>(`/api/v1/user/upload-cover-picture`, file);
  return response.data;
};

export const deactivateProfileApi = async () => {
  await api.delete<void>(`/api/v1/user/me`);
  return "user deleted successfully";
};
