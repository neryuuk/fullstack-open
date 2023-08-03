import { useState } from 'react'

const NewNote = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = event => {
    event.preventDefault()
    createNote({ content: newNote, important: true })

    setNewNote('')
  }

  return <div>
    <h2>Create a new note</h2>
    <form onSubmit={addNote}>
      <input
        id='note'
        value={newNote}
        onChange={({ target }) => setNewNote(target.value)}
        placeholder='write note content here...'
      />
      <button id='new-note-button' type="submit">save</button>
    </form>
  </div>
}

export default NewNote
