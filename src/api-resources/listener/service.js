import axios from 'axios'
import { LISTENER_ROUTE } from './route'

const listenerService = {
  async register(request) {
    try {
      const response = await axios.post(LISTENER_ROUTE, request, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.status === 201) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  async get(username) {
    try {
      const response = await axios.get(`${LISTENER_ROUTE}/${username}`)

      if (response.status === 200)
        return { success: true, data: response.data.data }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  async getSingleFavoriteArtist(listenerUsername, artistUsername) {
    try {
      const response = await axios.get(
        `${LISTENER_ROUTE}/${listenerUsername}/favorite-artists/${artistUsername}`
      )

      if (response.status === 200) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  }
}

export default listenerService
