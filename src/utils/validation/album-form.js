import { z } from 'zod'

const MAX_IMAGE_SIZE = 10000000 //5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

export const albumSchema = z.object({
  title: z.string().min(1, 'title is required'),
  genre: z.string().min(1, 'genre is required'),
  image: z
    .any()
    .refine((file) => file !== null, 'Image is required')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Image format is not supported'
    )
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 10MB')
})

export const albumImageSchema = albumSchema.omit({
  title: true,
  genre: true
})
