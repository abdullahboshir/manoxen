import z from "zod";
import { loginZodSchema } from "../utils/auth.validation";

export type TLoginPayload = z.infer<typeof loginZodSchema>;


