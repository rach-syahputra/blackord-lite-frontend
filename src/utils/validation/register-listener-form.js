import { z } from 'zod'

const MAX_IMAGE_SIZE = 2000000 //2MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

export const registerListenerSchema = z.object({
  username: z
    .string()
    .min(1, 'username is required')
    .max(12, 'username must be less than 12 characters'),
  image: z
    .any()
    .refine((file) => file !== null, 'Image is required')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Image format is not supported'
    )
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 2MB')
})

export const listenerImageSchema = registerListenerSchema.omit({
  username: true
})
