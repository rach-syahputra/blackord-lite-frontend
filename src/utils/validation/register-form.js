import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, 'username is required')
      .max(12, 'username must be less than 12 characters'),
    email: z
      .string()
      .min(1, 'email is required')
      .email('email format is invalid'),
    password: z.string().min(8, 'password must at least contains 8 characters'),
    confirmPassword: z.string().min(1, 'confirm password is required'),
    roleId: z.number().min(1, 'role is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match"
  })
