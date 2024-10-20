import { z } from 'zod'

export const songSchema = z.object({
  albumId: z
    .string({ message: 'album id for each song is required' })
    .min(1, 'album id for each song is required'),
  title: z.string().min(1, 'title is required'),
  duration: z
    .number({ message: 'duration must be a number' })
    .min(1, 'duration is required'),
  songPath: z.string().min(1, 'song path is required')
})

export const addSongSchema = z.object({
  title: z.string().min(1, 'title is required'),
  duration: z
    .number({ message: 'duration must be a number' })
    .min(1, 'duration is required'),
  file: z.any().refine((file) => file !== null, 'Song file is required')
})
