import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getOne = id => {
  return axios.get(`${baseUrl}/${id}`).then(({ data }) => data)
}

const getAll = () => {
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return axios.get(baseUrl).then(({ data }) => data.concat(nonExisting))
}

const create = item => {
  return axios.post(baseUrl, item).then(({ data }) => data)
}

const update = (id, item) => {
  return axios.put(`${baseUrl}/${id}`, item).then(({ data }) => data)
}

export default { getOne, getAll, create, update }
