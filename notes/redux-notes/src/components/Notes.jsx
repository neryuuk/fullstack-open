import { useSelector } from 'react-redux'
import Note from './Note'
import { ALL, IMPORTANT } from '../reducers/filterReducer'

export const Notes = () => {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === ALL) return notes

    return filter === IMPORTANT
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return <ul id='notes'>{
    notes.map(note => <Note key={note.id} {...note} />)
  }</ul>
}

export default Notes
