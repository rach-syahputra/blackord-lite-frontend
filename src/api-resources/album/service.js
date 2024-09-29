import axios from 'axios'
import Cookies from 'universal-cookie'
import { ALBUM_ROUTE } from './route'

const albumService = {
  async add(request) {
    try {
      const cookies = new Cookies()
      const token = cookies.get('blackord-access-token')

      const response = await axios.post(ALBUM_ROUTE, request, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 201)
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

export default albumService
