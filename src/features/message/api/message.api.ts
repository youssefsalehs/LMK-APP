import { api } from "@/lib/axios";
import type { Message } from "@/types/messageModel";
interface BaseResponse {
  success: boolean;
  message?: string;
}
export async function createMsgApi(data: Partial<Message>) {
  const res = await api.post<BaseResponse>("/api/v1/message/", data);
  return res.data;
}

export async function createMsgAnonmyousApi(data: Partial<Message>) {
  const res = await api.post<BaseResponse>("/api/v1/message/anonymous", data);
  return res.data;
}
