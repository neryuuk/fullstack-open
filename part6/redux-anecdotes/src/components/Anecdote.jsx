import { useDispatch } from 'react-redux'
import { vote } from '../actions/anecdoteAction'

export const Anecdote = ({ id, content, votes }) => {
  const dispatch = useDispatch()
  const handleVote = () => dispatch(vote(id))

  return <div className='anecdote' id={`anec-${id}`}>
    <div>{content}</div>
    <div>
      has {votes}
      <button className='btn-vote' onClick={handleVote}>vote</button>
    </div>
  </div>
}

export default Anecdote
