import { useState, useEffect } from 'react'
import { getAll } from './services/blogs'
import { login } from './services/login'
import Login from './components/Login'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleField = ({ target }) => {
    const methods = {
      username: setUsername,
      password: setPassword
    }

    methods[target.id](target.value)
  }

  const handleLoggedUser = user => {
    setUser(user)
  }

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const response = await login({ username, password })
      handleLoggedUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception)
    }
  }

  return <>
    <h2>{user ? 'blogs' : 'log in to application'}</h2>
    <Login {...{ user, username, password, handleField, handleLogin }} />
    {user && <Blogs blogs={blogs} />}
  </>
}

export default App
