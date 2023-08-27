import axios from 'axios'
export const BASE = '/api/anecdotes'

export const get = () => {
  return axios.get(BASE).then(({ data }) => data)
}
