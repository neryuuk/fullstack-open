import { useDispatch } from 'react-redux'
import { create } from '../reducers/noteReducer'
import { post } from '../services/notes'

export const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    dispatch(create(await post(event.target.note.value)))
    event.target.note.value = ''
  }

  return <form onSubmit={addNote}>
    <input id='note' name='note' />
    <button id='note-submit' htmlFor='note' type='submit'>add</button>
  </form>
}

export default NewNote
