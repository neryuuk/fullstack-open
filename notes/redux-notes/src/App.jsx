import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Filter from './components/Filter'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import { get } from './services/notes'
import { setNotes } from './reducers/noteReducer'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    get().then(notes => dispatch(setNotes(notes)))
  }, [])

  return <div>
    <NewNote />
    <Filter />
    <Notes />
  </div>
}

export default App
