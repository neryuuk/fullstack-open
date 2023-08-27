import axios from 'axios'
const BASE = '/api/anecdotes'

export const get = () => {
  return axios.get(BASE).then(({ data }) => data)
}

export const post = anecdote => {
  return axios.post(BASE, anecdote).then(({ data }) => data)
}

export const put = anecdote => {
  return axios.put(`${BASE}/${anecdote.id}`, anecdote).then(({ data }) => data)
}
