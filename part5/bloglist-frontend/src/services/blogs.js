import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const getConfig = () => ({ headers: { Authorization: loginService.getAuthToken() }})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const updateBlog = async (id, blogData) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, blogData, getConfig())
  return response.data
}

const likeBlog = async id => {
  const url = baseUrl + '/like/' + id
  await axios.put(url)
}

const removeBlog = async id => {
  const url = baseUrl + '/' + id
  await axios.delete(url, getConfig())
}

export default {
  getAll,
  addBlog,
  updateBlog,
  likeBlog,
  removeBlog
}
