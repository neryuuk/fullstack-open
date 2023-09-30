import Note from './Note'

const Notes = ({ notes }) => {
  return <>
    <div><h2>Notes</h2></div>
    <ul>{notes.map(note => <Note key={note.id} note={note} />)}</ul>
  </>
}

export default Notes
