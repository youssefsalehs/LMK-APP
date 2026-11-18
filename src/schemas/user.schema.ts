import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  username: z.string().min(3).max(20).trim(),
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  dob: z.coerce.date().nullable().optional(),
});
