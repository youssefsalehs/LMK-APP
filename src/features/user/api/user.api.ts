import { api } from "@/lib/axios";
import type { User } from "@/types/User";

export const getProfileApi = async (username: string) => {
  const response = await api.get<{ success: boolean; data: User }>(
    `/user/${username}`,
  );
  return response.data;
};
