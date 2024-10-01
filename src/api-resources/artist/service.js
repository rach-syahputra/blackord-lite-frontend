import axios from 'axios'
import { ARTIST_ROUTE } from './route'
import jwtService from '../../utils/token/jwt'

const artistService = {
  async register(request) {
    try {
      const response = await axios.post(ARTIST_ROUTE, request, {
        headers: { 'Content-Type': 'multipart/form-data' }
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

  async get(username) {
    try {
      const response = await axios.get(`${ARTIST_ROUTE}/${username}`)

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
  },

  async getAll() {
    try {
      const response = await axios.get(ARTIST_ROUTE)

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

  async follow(username) {
    try {
      const token = jwtService.getToken()

      if (!token) {
        return {
          success: false,
          error: 'Unauthenticated',
          statusCode: 401
        }
      }

      const response = await axios.post(
        `${ARTIST_ROUTE}/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 401) {
        return {
          success: false,
          error: 'unauthenticated',
          statusCode: 401
        }
      }

      if (error.response.status === 500) {
        return {
          success: false,
          error: 'something went wrong, please try again'
        }
      }
    }
  },

  async unfollow(username) {
    try {
      const token = jwtService.getToken()

      if (!token) {
        return {
          success: false,
          error: 'Unauthenticated',
          statusCode: 401
        }
      }

      const response = await axios.post(
        `${ARTIST_ROUTE}/${username}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 401) {
        return {
          success: false,
          error: 'unauthenticated',
          statusCode: 401
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

export default artistService
