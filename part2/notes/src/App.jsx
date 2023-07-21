import { useState, useEffect } from 'react'
import Note from './components/Note'
import { getAll, create, update } from './services/notes'
import { login } from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const hook = () => {
    getAll().then(data => {
      setNotes(data)
    }).catch(console.error)
  }

  useEffect(hook, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    create(noteObject).then(data => {
      console.log(data)
      setNotes(notes.concat(data))
      setNewNote('')
    })
  }

  const handleField = ({ target }) => {
    const methods = {
      note: setNewNote,
      username: setUsername,
      password: setPassword
    }

    methods[target.id](target.value)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const response = await login({ username, password })
      console.log(response, username, password)
      setUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const changeNote = { ...note, important: !note.important }
    update(id, changeNote).then(data => {
      setNotes(notes.map(note => note.id !== id ? note : data))
    }).catch(_ => {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => { setErrorMessage(null) }, 5000)

      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null && <Login
        username={username}
        password={password}
        handleField={handleField}
        handleLogin={handleLogin}
      />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input id='note' value={newNote} onChange={handleField} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
