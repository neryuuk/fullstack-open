import axios from 'axios'
const baseUrl = '/api/blogs'

const config = { headers: { Authorization: null } }

export const setToken = newToken => {
  config.headers.Authorization = `Bearer ${newToken}`
}

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const newBlog = async data => {
  const response = await axios.post(baseUrl, data, config)
  return response.data
}

export const updateBlog = async data => {
  const response = await axios.put(`${baseUrl}/${data.id}`, data, config)
  return response.data
}

export const deleteBlog = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
