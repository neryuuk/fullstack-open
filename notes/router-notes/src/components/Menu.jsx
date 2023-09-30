import { Link } from 'react-router-dom'

const Menu = ({ user }) => {
  return <div>
    <Link className='menu-item' to='/'>home</Link>
    <Link className='menu-item' to='/notes'>notes</Link>
    {user && <Link className='menu-item' to='/users'>users</Link>}
    {user
      ? <em>{user} logged in</em>
      : <Link className='menu-item' to="/login">login</Link>
    }
  </div>
}

export default Menu
