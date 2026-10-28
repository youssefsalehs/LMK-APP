import type { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { z } from "zod";

export type TforgotPasswordData = z.infer<typeof forgotPasswordSchema>;
