import type { BaseResponse, MetaData } from "./baseResponse";

export interface Message {
  _id: string;
  content: string;
  receiver: string;
  sender?: {
    username: string;
    profilePicture?: string;
  };
  isDeleted: boolean;
  isAnonymous: boolean;
  hasRequestedReveal?: boolean;
  media: string[];
  createdAt?: string;
  updatedAt?: string;
}
export interface MessageResponse extends BaseResponse {
  data: Message;
}
export interface AllMessagesResponse extends BaseResponse {
  data: Message[] | [];
  metaData: MetaData;
}
