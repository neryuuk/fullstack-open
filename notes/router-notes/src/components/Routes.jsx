import { Route, Routes } from 'react-router-dom'
import Notes from './Notes'
import Users from './Users'
import Home from './Home'

const MyRoutes = ({ notes }) => {
  return <Routes>
    <Route path='/notes/:id' element={<Notes {...{ notes }} />} />
    <Route path='/notes' element={<Notes {...{ notes }} />} />
    <Route path='/users' element={<Users />} />
    <Route path='/' element={<Home />} />
  </Routes>
}

export default MyRoutes
