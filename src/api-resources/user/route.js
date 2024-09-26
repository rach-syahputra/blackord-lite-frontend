import { API_BASE_URL } from '../config'

const USER_ROUTE = `${API_BASE_URL}/users`

const AUTH_ROUTE = `${API_BASE_URL}/auth`
const LOGIN_ROUTE = `${AUTH_ROUTE}/login`
const GET_CURRENT_ROUTE = `${AUTH_ROUTE}/current-user`

export { USER_ROUTE, LOGIN_ROUTE, GET_CURRENT_ROUTE }
