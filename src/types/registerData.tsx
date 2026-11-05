import type { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";

export type TRegisterData = z.infer<typeof registerSchema>;
