import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  username: z.string().min(3).max(20).trim(),
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  password: z.string().min(8).max(16).trim(),
  dob: z.coerce.date().optional(),
  gender: z.enum(["male", "female"]).optional(),
});
