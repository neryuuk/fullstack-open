import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()

  const onSubmit = event => {
    event.preventDefault()
    onLogin(event.target.username.value)
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='username'>username</label>
          <input id='username' name='username' type='text' />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input id='password' name='password' type='password' />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
