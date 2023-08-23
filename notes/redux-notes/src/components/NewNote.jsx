import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

export const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = event => {
    event.preventDefault()
    dispatch(createNote(event.target.note.value))
    event.target.note.value = ''
  }

  return <form onSubmit={addNote}>
    <input id='note' name='note' />
    <button id='note-submit' htmlFor='note' type='submit'>add</button>
  </form>
}

export default NewNote
