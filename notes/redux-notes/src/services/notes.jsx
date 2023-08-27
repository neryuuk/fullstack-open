import axios from 'axios'

export const get = async () => {
  try {
    const response = await axios.get('/notes')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const post = async (content) => {
  try {
    const response = await axios.post('/notes', { content, important: false })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export const put = async (content) => {
  try {
    const response = await axios.put(`/notes/${content.id}`, content)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
