import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { get } from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    get().then(notes => dispatch(setAnecdotes(notes)))
  }, [])

  return <>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
  </>
}

export default App
