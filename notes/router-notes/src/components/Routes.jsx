import { Route, Routes as ReactRoutes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Notes from './Notes'
import Users from './Users'

const Routes = ({ notes, onLogin, user }) => {
  return <ReactRoutes>
    <Route path='/notes/:id' element={<Notes {...{ notes }} />} />
    <Route path='/notes' element={<Notes {...{ notes }} />} />
    {user && <Route path='/users' element={<Users />} />}
    <Route path='/login' element={<Login onLogin={onLogin} />} />
    <Route path='/' element={<Home />} />
  </ReactRoutes>
}

export default Routes
