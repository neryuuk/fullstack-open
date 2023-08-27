import { useDispatch } from 'react-redux'
import { switchImportant } from '../reducers/noteReducer'
import { put } from '../services/notes'

export const Note = ({ id, content, important }) => {
  const dispatch = useDispatch()

  const toggle = async () => {
    const updated = await put({ id, content, important: !important })
    dispatch(switchImportant(updated.id))
  }

  return <li id={`note-${id}`} onClick={toggle}>
    {content} <strong>{important ? 'is important' : ''}</strong>
  </li>
}

export default Note
