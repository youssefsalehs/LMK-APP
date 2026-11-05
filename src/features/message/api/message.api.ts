import { api } from "@/lib/axios";
import type { IMessage } from "@/types/Message";
interface BaseResponse {
  success: boolean;
  message?: string;
}
export async function createMsgApi(data: Partial<IMessage>) {
  const res = await api.post<BaseResponse>("/message/", data);
  return res.data;
}

export async function createMsgAnonmyousApi(data: Partial<IMessage>) {
  const res = await api.post<BaseResponse>("/message/anonymous", data);
  return res.data;
}
