import { useState, useEffect } from 'react'
import Note from './components/Note'
import { getAll, create, update, setToken } from './services/notes'
import { login } from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import Footer from './components/Footer'
import NewNote from './components/NewNote'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then(data => {
      setNotes(data)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    const storage = window.localStorage.getItem('loggedNoteappUser')
    if (storage) handleLoggedUser(JSON.parse(storage))
  }, [])

  const handleLoggedUser = user => {
    setUser(user)
    setToken(user?.token)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    handleLoggedUser(null)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    setToken(user.token)
    create(noteObject).then(data => {
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
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(response))
      handleLoggedUser(response)
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
      <Login {...{ user, username, password, handleField, handleLogin, handleLogout }} />
      {user && <NewNote {...{ user, addNote, newNote, handleField }} />}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>{notesToShow.map(note =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
        />
      )}</ul>
      <Footer />
    </div>
  )
}

export default App
