import { z } from "zod";

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  password: z.string().min(8).max(16).trim(),
});
