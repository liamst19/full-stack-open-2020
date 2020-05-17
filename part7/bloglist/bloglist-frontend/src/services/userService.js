import axios from 'axios'
import loginService from './loginService'
const baseUrl = '/api/user'

const getConfig = () => ({
  headers: {
    Authorization: loginService.getAuthToken()
  }
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addUser = async (newUser) => {
  const response = await axios.post(baseUrl, newUser, getConfig())
  return response.data
}

const updateUser = async (id, userData) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, userData, getConfig())
  return response.data
}

const removeUser = async id => {
  const url = baseUrl + '/' + id
  await axios.delete(url, getConfig())
}

export default {
  getAll,
  addUser,
  updateUser,
  removeUser
}
