import { api } from "@/lib/axios";
import type { BaseResponse } from "@/types/baseResponse";
import type { AllMessagesResponse, Message } from "@/types/messageModel";

export async function createMsgApi(data: Partial<Message>) {
  const res = await api.post<BaseResponse>("/api/v1/message/", data);
  return res.data;
}

export async function createMsgAnonmyousApi(data: Partial<Message>) {
  const res = await api.post<BaseResponse>("/api/v1/message/anonymous", data);
  return res.data;
}

export async function getAllMsgsForUserApi(
  page: number,
): Promise<AllMessagesResponse> {
  const res = await api.get<AllMessagesResponse>(
    `/api/v1/message?page=${page}&limit=5`,
  );
  return res.data;
}
