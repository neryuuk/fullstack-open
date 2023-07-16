import axios from 'axios'
const baseUrl = '/api/persons'

export const create = item => {
  return axios.post(baseUrl, item).then(({ data }) => data)
}

export const read = () => {
  return axios.get(baseUrl).then(({ data }) => data)
}

export const update = item => {
  return axios.put(`${baseUrl}/${item.id}`, item).then(({ data }) => data)
}

export const del = item => {
  return axios.delete(`${baseUrl}/${item}`).then(({ data }) => data)
}
