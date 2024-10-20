import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import uniqid from 'uniqid'
import { SONG_ROUTE } from './route'
import jwtService from '../../utils/token/jwt'

const supabaseClient = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
)

const songService = {
  async add(request) {
    try {
      const token = jwtService.getToken()

      const response = await axios.post(SONG_ROUTE, request, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  async upload(songFile) {
    try {
      const uniqueId = uniqid()

      const { data, error } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw new Error('upload song failed')

      return {
        success: true,
        data: data.path
      }
    } catch (error) {
      console.error(error)
    }
  },

  async stream(song) {
    try {
      const { data } = supabaseClient.storage
        .from('songs')
        .getPublicUrl(song.song_path)

      return {
        success: true,
        data
      }
    } catch (error) {
      console.error(error)
    }
  },

  async get(id) {
    try {
      const response = await axios.get(`${SONG_ROUTE}/${id}`)

      if (response.status === 200)
        return { success: true, data: response.data.data }
    } catch (error) {
      console.error(error.response.data.error)

      if (response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  async getFromAlbum(albumId) {
    try {
      const response = await axios.get(`${SONG_ROUTE}/albums/${albumId}`)

      if (response.status === 200)
        return { success: true, data: response.data.data }
    } catch (error) {
      console.error(error.response.data.error)

      if (response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  getSongUrl(songPath) {
    if (!songPath) return ''

    const { data } = supabaseClient.storage.from('songs').getPublicUrl(songPath)

    return { success: true, data: data.publicUrl }
  }
}

export default songService
