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

      return {
        success: false,
        message: 'something went wrong, please try again'
      }
    }
  }
}

export default listenerService
