import { useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

export const Note = ({ id, content, important }) => {
  const dispatch = useDispatch()

  const toggleImportance = id => {
    dispatch(toggleImportanceOf(id))
  }

  return <li id={`note-${id}`} onClick={() => toggleImportance(id)}>
    {content} <strong>{important ? 'is important' : ''}</strong>
  </li>
}

export default Note
