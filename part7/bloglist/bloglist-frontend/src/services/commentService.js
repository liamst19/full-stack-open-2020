import axios from 'axios'
const baseUrl = '/api/blogs'

const getComments = async (blogId) => {
  const url = baseUrl + '/' + blogId + '/comments'
  const response = await axios.get(url)
  return response.data
}

const addComment = async (blogId, comment) => {
  const url = baseUrl + '/' + blogId + '/comments'
  const response = await axios.post(url, { blogId, comment })
  return response.data
}

export default {
  getComments,
  addComment
}
