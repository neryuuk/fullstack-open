import { useSelector } from 'react-redux'
import Anecdote from '../components/Anecdote'

export const Anecdotes = () => {
  const anecdotes = useSelector(state => state)

  return <>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote => <Anecdote {...anecdote} key={anecdote.id} />)}
  </>
}

export default Anecdotes
