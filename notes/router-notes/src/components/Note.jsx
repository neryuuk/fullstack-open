const Note = ({ note }) => {
  return <div>
    <div><h2>Note</h2></div>
    <p>
      <div>{note.content}</div>
      <div>{note?.user?.name}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </p>
  </div>
}

export default Note
