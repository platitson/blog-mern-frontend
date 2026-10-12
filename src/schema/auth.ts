import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const RegistrationSchema = z.object({
  fullName: z.string().min(3, "Very short name"),
  email: z.email(),
  password: z
    .string()
    .min(5, "The password must contain at least 5 characters"),
});
