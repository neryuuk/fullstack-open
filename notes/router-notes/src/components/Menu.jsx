import { Link } from 'react-router-dom'

const Menu = () => {
  return <div>
    <Link className='menu-item' to='/'>home</Link>
    <Link className='menu-item' to='/notes'>notes</Link>
    <Link className='menu-item' to='/users'>users</Link>
  </div>
}

export default Menu
