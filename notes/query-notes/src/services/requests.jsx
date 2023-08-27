import axios from 'axios'

export const get = () =>
  axios.get('/notes').then(({ data }) => data)
