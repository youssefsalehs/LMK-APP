import type { BaseResponse, MetaData } from "./baseResponse";

export interface Request {
  _id: string;
  message: {
    _id: string;
    content: string;
    createdAt: string;
  };
  receiver: {
    _id: string;
    username: string;
    profilePicture?: { secure_url: string; public_id: string };
  };
  sender: {
    _id: string;
    username: string;
    profilePicture?: { secure_url: string; public_id: string };
  };
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface RequestResponse extends BaseResponse {
  data: Request[] | [];
  metaData: MetaData;
}
