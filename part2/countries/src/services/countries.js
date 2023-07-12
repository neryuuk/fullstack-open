import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

export const read = () => {
  return axios.get(baseUrl).then(({ data }) => data)
}
