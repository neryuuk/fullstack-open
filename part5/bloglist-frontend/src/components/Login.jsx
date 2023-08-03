import PropTypes from 'prop-types'
import { Link } from './Link'

const Login = ({ user, username, password, handleField, handleLogin, handleLogout }) => {
  return user
    ? <p>{user.name} logged in (<Link action={handleLogout} text='logout' />)</p>
    : <form onSubmit={handleLogin}>
      <div>
        <label className='loginFields' htmlFor='username'>username</label>
        <input id='username' type='text' value={username} onChange={handleField} />
      </div>
      <div>
        <label className='loginFields' htmlFor='password'>password</label>
        <input id='password' type='password' value={password} onChange={handleField} />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
}

Login.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Login
