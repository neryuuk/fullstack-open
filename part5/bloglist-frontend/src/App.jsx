import { useState, useEffect } from 'react'
import { setToken, getAll, newNote } from './services/blogs'
import { login } from './services/login'
import Login from './components/Login'
import Blogs from './components/Blogs'
import { NewBlog } from './components/NewBlog'
import { Toast } from './components/Toast'

const App = () => {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
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
      setNotification(`a new blog ${newTitle} ${newAuthor ? `by ${newAuthor}` : ''}added`)
      setBlogs(blogs.concat(response))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      setNotification(exception?.response?.data?.error, true)
    }
  }

  const handleLoggedUser = user => {
    setUser(user)
    setToken(user?.token)
  }

  const setNotification = (message, isError = false, timeout = 3000) => {
    setError(!!isError)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
      setError(false)
    }, timeout)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const response = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(response))
      setNotification(`Successful login. Welcome back, ${response?.name}`)
      handleLoggedUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(exception?.response?.data?.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    handleLoggedUser(null)
    setNotification('Successful logout')
  }

  return <>
    <h2>{user ? 'blogs' : 'log in to application'}</h2>
    <Toast message={message} type={error ? 'error' : 'info'} />
    <Login {...{ user, username, password, handleField, handleLogin, handleLogout }} />
    {user && <NewBlog {...{ newTitle, newAuthor, newUrl, handleNote, handleField }} />}
    {user && <Blogs blogs={blogs} />}
  </>
}

export default App
