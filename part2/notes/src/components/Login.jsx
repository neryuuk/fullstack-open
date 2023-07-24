import { useState } from 'react'
import Link from './Link'

const Login = ({ user, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleField = ({ target }) => {
    const methods = {
      username: setUsername,
      password: setPassword
    }

    methods[target.id](target.value)
  }

  const login = async event => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return user
    ? <p>{user.name} logged in (<Link action={handleLogout} text='logout' />)</p>
    : <form onSubmit={login}>
      <div>
        <label htmlFor='username'>username</label>
        <input id='username' type='text' value={username} onChange={handleField} />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input id='password' type='password' value={password} onChange={handleField} />
      </div>
      <button type='submit'>login</button>
    </form>
}

export default Login
