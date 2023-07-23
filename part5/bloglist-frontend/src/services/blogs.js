import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line
let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
