import axios from 'axios'
const baseUrl = '/api/login'

export const TOKEN_KEY = 'loggedBlogListappuser'

export const getAuthToken = () => {
  const user = getLocalStorageUser()
  return user ? `Bearer ${ user.token }` : null
}

export const login = async (username, password) => {
  const response = await axios.post(baseUrl, {username, password})
  return response.data
}

export const setLocalStorageUser = user => {
  window.localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify(user)
  )
}

export const getLocalStorageUser = () => {
  const userJSON = window.localStorage.getItem(TOKEN_KEY)
  return userJSON ? JSON.parse(userJSON) : null
}

export const removeLocalStorageUser = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

export default {
  login,
  getAuthToken,
  setLocalStorageUser,
  getLocalStorageUser,
  removeLocalStorageUser
}
