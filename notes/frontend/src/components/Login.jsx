import { useState } from 'react'
import Link from './Link'
import PropTypes from 'prop-types'

const Login = ({ user, handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleField = ({ target }) => {
    const methods = {
      username: setUsername,
      password: setPassword,
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
    ? <p>{user.name} logged in (<Link id='logout' action={handleLogout} text='logout' />)</p>
    : <form onSubmit={login}>
      <div>
        <label htmlFor='username'>username</label>
        <input id='username' type='text' value={username} onChange={handleField} />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input id='password' type='password' value={password} onChange={handleField} />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
}

Login.propTypes = {
  user: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Login
