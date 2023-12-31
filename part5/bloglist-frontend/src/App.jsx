import { useState, useEffect, useRef } from 'react'
import { setToken, getAll, newBlog, updateBlog, deleteBlog } from './services/blogs'
import { login } from './services/login'
import Login from './components/Login'
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Toast from './components/Toast'
import Togglable from './components/Togglable'

const App = () => {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogTogglableRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const storage = window.localStorage.getItem('loggedUser')
    if (storage) handleLoggedUser(JSON.parse(storage))
  }, [])

  const handleField = ({ target }) => {
    const methods = {
      username: setUsername,
      password: setPassword,
    }

    methods[target.id](target.value)
  }

  const handleBlog = async (data) => {
    try {
      const response = await newBlog(data)
      setNotification(`a new blog ${data.title} ${data.author ? `by ${data.author} ` : ''}added`)
      setBlogs(blogs.concat(response).sort((a, b) => b.likes - a.likes))
      blogFormRef.current.clearFields()
      blogTogglableRef.current.toggleVisibility()
    } catch (exception) {
      setNotification(exception?.response?.data?.error, true)
    }
  }

  const handleDelete = async data => {
    try {
      await deleteBlog(data.id)
      setNotification(`Removed blog '${data.title}' ${data.author ? `by ${data.author} ` : ''}`)
      setBlogs(blogs.filter(blog => blog.id !== data.id))
    } catch (exception) {
      setNotification(exception?.response?.data?.error, true)
    }
  }

  const handleLike = async (data) => {
    try {
      const response = await updateBlog(data)
      setNotification(`you liked '${response.title}'`)
      setBlogs(blogs.map(blog => {
        if (blog.id !== data.id) return blog
        return { ...blog, likes: response.likes }
      }).sort((a, b) => b.likes - a.likes))
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
    {user && <Togglable id='new-blog' buttonLabel='create new blog' ref={blogTogglableRef}>
      <NewBlog handleBlog={handleBlog} ref={blogFormRef} />
    </Togglable>}
    {user && <Blogs {...{ user, blogs, handleLike, handleDelete }} />}
  </>
}

export default App
