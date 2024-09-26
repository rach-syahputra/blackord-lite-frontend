import { z } from 'zod'

const MAX_IMAGE_SIZE = 5000000 //5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

export const registerArtistSchema = z.object({
  username: z
    .string()
    .min(1, 'username is required')
    .max(12, 'username must be less than 12 characters'),
  artistName: z.string().min(1, 'artist name is required'),
  bio: z
    .string()
    .min(10, 'bio must at least contain 10 characters')
    .max(200, 'bio must be less than 200 characters'),
  image: z
    .any()
    .refine((file) => file !== null, 'Image is required')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Image format is not supported'
    )
    .refine((file) => file?.size <= MAX_IMAGE_SIZE, 'Max image size is 5MB')
})

export const artistImageSchema = registerArtistSchema.omit({
  username: true,
  artistName: true,
  bio: true
})
