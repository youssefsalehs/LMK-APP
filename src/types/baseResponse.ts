export interface BaseResponse {
  success: boolean;
  message?: string;
}
export interface MetaData {
  currentPage: number;
  total: number;
  totalPages: number;
  limit: number;
}
