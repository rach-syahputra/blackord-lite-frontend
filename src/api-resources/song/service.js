import axios from 'axios'
import Cookies from 'universal-cookie'
import { SONG_ROUTE } from './route'

const songService = {
  async add(request) {
    try {
      const cookies = new Cookies()
      const token = cookies.get('blackord-access-token')

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
