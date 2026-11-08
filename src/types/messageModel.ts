export interface Message {
  _id: string;
  content: string;
  receiver: string;
  sender?: string;
  isDeleted: boolean;
  isAnonymous: boolean;
  media: string[];
  createdAt?: string;
  updatedAt?: string;
}
