import { useState } from 'react'
import ReactDOM from 'react-dom/client'

const Home = () => <div><h2>TKTL notes app</h2></div>

const Notes = () => <div><h2>Notes</h2></div>

const Users = () => <div><h2>Users</h2></div>

const App = () => {
  const [page, setPage] = useState('home')

  const toPage = page => event => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home') return <Home />
    if (page === 'notes') return <Notes />
    if (page === 'users') return <Users />
  }

  return (
    <div>
      <div>
        <a href="" onClick={toPage('home')} className='menu-item'>home</a>
        <a href="" onClick={toPage('notes')} className='menu-item'>notes</a>
        <a href="" onClick={toPage('users')} className='menu-item'>users</a>
      </div>

      {content()}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
