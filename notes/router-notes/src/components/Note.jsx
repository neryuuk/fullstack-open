const Note = ({ note }) => {
  return <li className='note'>
    <span>{note.content}</span>&nbsp;
  </li>
}

export default Note
