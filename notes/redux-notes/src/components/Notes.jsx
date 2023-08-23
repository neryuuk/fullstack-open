import { useSelector } from 'react-redux'
import Note from './Note'

export const Notes = () => {
  const notes = useSelector(state => state)

  return <ul id='notes'>{
    notes.map(note => <Note key={note.id} {...note} />)
  }</ul>
}

export default Notes