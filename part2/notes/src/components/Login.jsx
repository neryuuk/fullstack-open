import { Link } from './Link'

const Login = ({ user, username, password, handleField, handleLogin, handleLogout }) => {
  return user
    ? <p>{user.name} logged in (<Link action={handleLogout} text='logout' />)</p>
    : <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>username</label>
        <input
          id='username'
          type='text'
          name='Username'
          value={username}
          onChange={handleField}
        />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input
          id='password'
          type='password'
          name='Password'
          value={password}
          onChange={handleField}
        />
      </div>
      <button type='submit'>login</button>
    </form>
}

export default Login
