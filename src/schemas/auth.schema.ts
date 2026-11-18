import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
});

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  password: z.string().min(8).max(16).trim(),
});

export const registerSchema = z.object({
  name: z.string().min(3).max(20).trim(),
  username: z.string().min(3).max(20).trim(),
  email: z.email("Please enter a valid email address").toLowerCase().trim(),
  password: z.string().min(8).max(16).trim(),

  dob: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  gender: z.enum(["male", "female"]).optional(),
});

export const resetPasswordSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  code: z
    .string()
    .length(6, "Please enter the 6-digit code")
    .regex(/^\d+$/, "Code must contain only numbers"),
  newPassword: z.string().min(8).max(16).trim(),
});

export const verifyOtpSchema = z.object({
  email: z.email('Please enter a valid email address"').toLowerCase().trim(),
  code: z
    .string()
    .length(6, "Please enter the 6-digit code")
    .regex(/^\d+$/, "Code must contain only numbers"),
});
