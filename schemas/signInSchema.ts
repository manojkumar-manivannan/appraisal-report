import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});

export type signInFormType = z.infer<typeof signInSchema>;
