import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  const newAnecdote = {
    id: getId(),
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateAnecdote = async (id, anecdote) => {
  const url = baseUrl + '/' + id
  const response = await axios.put(url, anecdote)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const url = baseUrl + '/' + anecdote.id
  const response = await axios.put(url, {...anecdote,
                                         votes: anecdote.votes + 1})
  return response.data
}

const removeAnecdote = async (id) => {
  const url = baseUrl + '/' + id
  const response = await axios.delete(url)
  return response.data
}


export default {
  getAll,
  addAnecdote,
  updateAnecdote,
  voteAnecdote,
  removeAnecdote
}
