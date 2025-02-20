import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name must be at least 1 character"),
  lastName: z.string().min(1, "Last name must be at least 1 character"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password must be at least 6 characters"),
});

export type signUpFormType = z.infer<typeof signUpSchema>;
