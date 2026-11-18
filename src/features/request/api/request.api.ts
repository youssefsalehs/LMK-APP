import { api } from "@/lib/axios";
import type { BaseResponse } from "@/types/baseResponse";
import type { RequestResponse } from "@/types/requestModel";

export async function makeRequestApi(id: string): Promise<BaseResponse> {
  const res = await api.post<BaseResponse>(`/api/v1/request/${id}`);
  return res.data;
}

export async function getSentRequestsApi(
  page: number,
): Promise<RequestResponse> {
  const res = await api.get<RequestResponse>(
    `/api/v1/request/receiver?page=${page}&limit=6`,
  );
  return res.data;
}
export async function getincomingRequestsApi(
  page: number,
): Promise<RequestResponse> {
  const res = await api.get<RequestResponse>(
    `/api/v1/request/sender?page=${page}&limit=6`,
  );
  return res.data;
}

export async function acceptRequestApi(id: string): Promise<RequestResponse> {
  const res = await api.patch<RequestResponse>(`/api/v1/request/${id}`, {
    status: "accepted",
  });
  return res.data;
}
export async function rejectRequestApi(id: string): Promise<RequestResponse> {
  const res = await api.patch<RequestResponse>(`/api/v1/request/${id}`, {
    status: "rejected",
  });
  return res.data;
}
