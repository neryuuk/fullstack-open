import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getOne = id => {
  return axios.get(`${baseUrl}/${id}`).then(({ data }) => data)
}

export const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data)
}

export const create = item => {
  const config = { headers: { Authorization: token } }
  return axios.post(baseUrl, item, config).then(({ data }) => data)
}

export const update = (id, item) => {
  return axios.put(`${baseUrl}/${id}`, item).then(({ data }) => data)
}
