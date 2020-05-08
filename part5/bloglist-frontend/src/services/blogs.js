import axios from 'axios'
import { getAuthToken } from './login'
const baseUrl = '/api/blogs'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async (newBlog) => {
  const config = { headers: { Authorization: getAuthToken() }}
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, createBlog }
