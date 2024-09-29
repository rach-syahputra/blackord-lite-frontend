import { z } from 'zod'

export const songSchema = z.object({
  albumId: z
    .string({ message: 'album id for each song is required' })
    .min(1, 'album id for each song is required'),
  title: z.string().min(1, 'title is required'),
  duration: z
    .number({ message: 'duration must be a number' })
    .min(1, 'duration is required')
})

export const addSongSchema = songSchema.omit({ albumId: true })
