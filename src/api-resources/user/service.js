import axios from 'axios'
import { GET_CURRENT_ROUTE, LOGIN_ROUTE, USER_ROUTE } from './route'
import Cookies from 'universal-cookie'

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
  },

  async login(request) {
    try {
      const response = await axios.post(LOGIN_ROUTE, request)

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken
        const cookies = new Cookies()
        cookies.set('blackord-access-token', accessToken)

        return { success: true }
      }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500)
        return { success: false, message: 'something went wrong' }

      return {
        success: false,
        error: error.response.data.error
      }
    }
  },

  async logout() {
    try {
      const cookies = new Cookies()
      cookies.remove('blackord-access-token')

      const token = cookies.get('blackord-access-token')
      if (token) {
        return {
          success: false,
          error: 'logout failed'
        }
      } else {
        return {
          success: true
        }
      }
    } catch (error) {
      return {
        success: false,
        error: error
      }
    }
  },

  async getCurrentUser() {
    try {
      const cookies = new Cookies()
      const token = cookies.get('blackord-access-token')
      const response = await axios.get(GET_CURRENT_ROUTE, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.data
        }
      }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500)
        return { success: false, message: 'something went wrong' }

      return {
        success: false,
        error: error.response.data.error
      }
    }
  }
}

export default userService
