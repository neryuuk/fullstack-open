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
      <button type='submit'>login</button>
    </form>
}

export default Login
