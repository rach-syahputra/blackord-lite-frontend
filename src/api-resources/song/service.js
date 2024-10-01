import axios from 'axios'
import { SONG_ROUTE } from './route'
import jwtService from '../../utils/token/jwt'

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
  }
}

export default songService
