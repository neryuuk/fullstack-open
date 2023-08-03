import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import { getAll, create, update, setToken } from './services/notes'
import { login } from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import Footer from './components/Footer'
import NewNote from './components/NewNote'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    getAll().then(data => {
      setNotes(data)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    const storage = window.localStorage.getItem('loggedNoteappUser')
    if (storage) handleLoggedUser(JSON.parse(storage))
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    handleLoggedUser(null)
  }

  const handleLoggedUser = user => {
    setUser(user)
    setToken(user?.token)
  }

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    create(noteObject).then(data => {
      setNotes(notes.concat(data))
    })
  }

  const handleLogin = async credentials => {
    try {
      const response = await login(credentials)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(response))
      handleLoggedUser(response)
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
    }).catch(() => {
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
      <Togglable id='login' buttonLabel='login'>
        <Login {...{ user, handleLogin, handleLogout }} />
      </Togglable>
      {user && <Togglable id='new-note' buttonLabel='new note' ref={noteFormRef}>
        <NewNote {...{ createNote }} />
      </Togglable>}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>{notesToShow.map(note => <Note
        key={note.id}
        note={note}
        toggleImportance={() => toggleImportanceOf(note.id)}
      />)}</ul>
      <Footer />
    </div>
  )
}

export default App
