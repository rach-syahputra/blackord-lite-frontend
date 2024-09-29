import axios from 'axios'
import Cookies from 'universal-cookie'
import { ALBUM_ROUTE } from './route'

const cookies = new Cookies()

const albumService = {
  async add(request) {
    try {
      const token = cookies.get('blackord-access-token')

      if (!token) {
        return {
          success: false,
          error: 'Unauthenticated',
          statusCode: 401
        }
      }

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

      if (error.response.status === 401) {
        const token = cookies.get('blackord-access-token')
        if (token) {
          cookies.remove('blackord-access-token')
          // TODO: REFRESH TOKEN
        }

        return {
          success: false,
          error: error.response.data.error,
          statusCode: error.response.status
        }
      }

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  }
}

export default albumService
