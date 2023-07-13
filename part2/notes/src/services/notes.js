import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

export const getOne = id => {
  return axios.get(`${baseUrl}/${id}`).then(({ data }) => data)
}

export const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data)
}

export const create = item => {
  return axios.post(baseUrl, item).then(({ data }) => data)
}

export const update = (id, item) => {
  return axios.put(`${baseUrl}/${id}`, item).then(({ data }) => data)
}
