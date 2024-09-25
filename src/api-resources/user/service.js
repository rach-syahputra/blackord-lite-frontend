import axios from 'axios'
import { USER_ROUTE } from './route'

const userService = {
  async register(request) {
    try {
      const response = await axios.post(USER_ROUTE, request)

      if (response.status === 201) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)
      return { success: false }
    }
  }
}

export default userService
