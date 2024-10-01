import Cookies from 'universal-cookie'

const jwtService = {
  getToken() {
    const cookies = new Cookies()
    const token = cookies.get('blackord-access-token')

    return token
  },

  setToken(token) {
    const cookies = new Cookies()
    cookies.set('blackord-access-token', token, { path: '/' })
  },

  removeToken() {
    const cookies = new Cookies()
    cookies.remove('blackord-access-token', { path: '/' })
  }
}

export default jwtService
