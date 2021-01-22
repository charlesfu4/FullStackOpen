import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObj = { content, votes:0 }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}
const update = async (id, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

export default { getAll, get, createNew, update }