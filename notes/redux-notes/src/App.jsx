import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Filter from './components/Filter'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import { initialize } from './reducers/noteReducer'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => { dispatch(initialize()) }, [])

  return <div>
    <NewNote />
    <Filter />
    <Notes />
  </div>
}

export default App
