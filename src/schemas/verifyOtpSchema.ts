import { z } from "zod";

export const verifyOtpSchema = z.object({
   email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  code: z
    .string()
    .length(6, "Please enter the 6-digit code")
    .regex(/^\d+$/, "Code must contain only numbers"),
});
