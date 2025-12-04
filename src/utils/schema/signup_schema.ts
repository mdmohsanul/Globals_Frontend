import { z } from "zod";

export const signupSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters"),
});

export type SignupData = z.infer<typeof signupSchema>;
