import {
  BrowserRouter as Router,
} from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAll } from './services/notes'
import Menu from './components/Menu'
import MyRoutes from './components/Routes'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  // const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then(data => {
      setNotes(data)
    }).catch(console.error)
  }, [])

  return (
    <Router>
      <Menu />
      <MyRoutes {...{ notes }} />
      <Footer />
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
