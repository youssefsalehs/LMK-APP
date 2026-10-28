import type { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";

export type TloginFormData = z.infer<typeof loginSchema>;
