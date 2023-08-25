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

export const post = async (content) => {
  try {
    const response = await axios.post('/anecdotes', { content, votes: 0 })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const put = async (content) => {
  try {
    const response = await axios.put(`/anecdotes/${content.id}`, content)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
