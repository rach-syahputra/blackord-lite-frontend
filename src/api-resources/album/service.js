import axios from 'axios'
import { ALBUM_ROUTE } from './route'
import jwtService from '../../utils/token/jwt'

const albumService = {
  async add(request) {
    try {
      const token = jwtService.getToken()

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
        const token = jwtService.getToken()
        if (token) {
          jwtService.removeToken()
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
  },

  async get(id) {
    try {
      const response = await axios.get(`${ALBUM_ROUTE}/${id}`)

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

  async getAllFromArtist(username) {
    try {
      const response = await axios.get(`${ALBUM_ROUTE}/artists/${username}`)

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

  async delete(albumId) {
    try {
      const token = jwtService.getToken()

      if (!token) {
        return {
          success: false,
          error: 'Unauthenticated',
          statusCode: 401
        }
      }

      const response = await axios.delete(`${ALBUM_ROUTE}/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.status === 200) return { success: true }
    } catch (error) {
      console.error(error.response.data.error)

      if (error.response.status === 401) {
        const token = jwtService.getToken()
        if (token) {
          jwtService.removeToken()
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
