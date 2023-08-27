import axios from 'axios'
const BASE = '/notes'

export const get = () =>
  axios.get(BASE).then(({ data }) => data)

export const post = note =>
  axios.post(BASE, note).then(({ data }) => data)

export const put = note => {
  axios.put(`${BASE}/${note.id}`, note).then(({ data }) => data)
}
