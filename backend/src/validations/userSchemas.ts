import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(32)
    .refine((value) => /\d/.test(value), {
      message: "Password must include a number",
    }),
  name: z
    .string({
      required_error: "firstName is required",
    })
    .min(2, "firstName must be at least 2 characters")
    .max(20),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  oldPassword: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(32),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "firstName must be at least 2 characters")
      .max(20)
      .optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .optional(),
    bio: z.string().max(150, "Bio must be at most 150 characters").optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
