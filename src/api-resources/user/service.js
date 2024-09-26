import axios from 'axios'
import { USER_ROUTE } from './route'

const userService = {
  async register(request) {
    try {
      const response = await axios.post(USER_ROUTE, request)

      if (response.status === 201) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 409)
        return { success: false, message: 'username already exists' }

      return {
        success: false,
        message: 'something went wrong, please try again'
      }
    }
  }
}

export default userService
