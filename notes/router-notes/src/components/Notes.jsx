import { Link, useParams } from 'react-router-dom'
import Note from './Note'

const Notes = ({ notes }) => {
  const id = useParams().id

  if (id) return <Note note={notes.find(note => note.id === id)} />

  return <>
    <div><h2>Notes</h2></div>
    <ul>{notes.map(note => {
      return <li className='note' key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </li>
    })}</ul>
  </>
}

export default Notes
