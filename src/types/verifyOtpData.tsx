import type { verifyOtpSchema } from "@/schemas/verifyOtpSchema";
import { z } from "zod";

export type TverifyOtpData = z.infer<typeof verifyOtpSchema>;
