import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const read = () => {
  return axios.get(baseUrl).then(({ data }) => data)
}

export const create = item => {
  return axios.post(baseUrl, item).then(({ data }) => data)
}
