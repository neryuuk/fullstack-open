import { useState, useEffect } from 'react'
import { setToken, getAll, newNote } from './services/blogs'
import { login } from './services/login'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { NewBlog } from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const storage = window.localStorage.getItem('loggedUser')
    if (storage) handleLoggedUser(JSON.parse(storage))
  }, [])

  const handleField = ({ target }) => {
    const methods = {
      username: setUsername,
      password: setPassword,
      title: setNewTitle,
      author: setNewAuthor,
      url: setNewUrl,
    }

    methods[target.id](target.value)
  }

  const handleNote = async event => {
    event.preventDefault()

    try {
      const response = await newNote({ title: newTitle, author: newAuthor, url: newUrl })
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLoggedUser = user => {
    setUser(user)
    setToken(user?.token)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const response = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      handleLoggedUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    handleLoggedUser(null)
  }

  return <>
    <h2>{user ? 'blogs' : 'log in to application'}</h2>
    <Login {...{ user, username, password, handleField, handleLogin, handleLogout }} />
    {user && <NewBlog {...{ newTitle, newAuthor, newUrl, handleNote, handleField }} />}
    {user && <Blogs blogs={blogs} />}
  </>
}

export default App
