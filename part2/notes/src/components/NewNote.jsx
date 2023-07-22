const NewNote = ({ addNote, newNote, handleField }) => {
  return <>
    <form onSubmit={addNote}>
      <input id='note' value={newNote} onChange={handleField} />
      <button type="submit">save</button>
    </form>
  </>
}

export default NewNote
