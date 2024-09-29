import axios from 'axios'
import Cookies from 'universal-cookie'
import { SONG_ROUTE } from './route'

const songService = {
  async add(request) {
    console.log('request', request)
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
  }
}

export default songService
