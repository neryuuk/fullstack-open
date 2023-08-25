import axios from 'axios'

export const get = async () => {
  try {
    const response = await axios.get('/anecdotes')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

