import { z } from 'zod'

const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'username is required')
    .max(12, 'username must be less than 12 characters'),
  email: z
    .string()
    .min(1, 'email is required')
    .email('email format is invalid'),
  password: z.string().min(8, 'password must at least contains 8 characters'),
  roleId: z.number().min(1, 'role is required')
})

export default registerSchema
