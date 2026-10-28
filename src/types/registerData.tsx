import type { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";

export type TregisterData = z.infer<typeof registerSchema>;
