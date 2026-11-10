import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  code: z
    .string()
    .length(6, "Please enter the 6-digit code")
    .regex(/^\d+$/, "Code must contain only numbers"),
  newPassword: z.string().min(8).max(16).trim(),
});
