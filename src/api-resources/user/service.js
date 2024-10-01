import axios from 'axios'
import { GET_CURRENT_ROUTE, LOGIN_ROUTE, USER_ROUTE } from './route'
import jwtService from '../../utils/token/jwt'

const userService = {
  async register(request) {
    try {
      const response = await axios.post(USER_ROUTE, request)

      if (response.status === 201) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 409)
        return { success: false, error: 'username already exists' }

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong'
        }
      }
    }
  },

  async login(request) {
    try {
      const response = await axios.post(LOGIN_ROUTE, request)

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken
        jwtService.setToken(accessToken)

        return { success: true }
      }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 500)
        return { success: false, error: 'something went wrong' }

      return {
        success: false,
        error: error.response.data.error
      }
    }
  },

  async logout() {
    try {
      jwtService.removeToken()

      const token = jwtService.getToken()

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

  async get(username) {
    try {
      const response = await axios.get(`${USER_ROUTE}/${username}`)

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
  },

  async getCurrentUser() {
    try {
      const token = jwtService.getToken()
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
