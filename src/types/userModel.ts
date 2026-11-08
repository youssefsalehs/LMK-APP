export const Gender = {
  MALE: "male",
  FEMALE: "female",
} as const;

export const Provider = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
  LOCAL: "local",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];
export type Provider = (typeof Provider)[keyof typeof Provider];

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  provider: Provider;
  isDeleted: boolean;
  isVerified: boolean;
  dob: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  gender?: Gender;
  profilePicture?: string;
  twoStepVerification: boolean;
  coverPicture?: string;
}
