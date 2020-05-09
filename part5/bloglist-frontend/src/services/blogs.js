import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  const config = { headers: { Authorization: loginService.getAuthToken() }}
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default {
  getAll,
  addBlog
}
