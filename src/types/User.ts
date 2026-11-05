export interface User {
  _id?: string;
  name: string;
  email: string;
  provider?: "google" | "facebook" | "local";
  username: string;
  password?: string;
  isDeleted?: boolean;
  isVerified: boolean;
  dob?: string;
  gender?: "male" | "female";
  profilePicture?: string;
  twoStepVerification: boolean;
  coverPicture?: string;
}
