import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

export const Anecdote = ({ id, content, votes }) => {
  const dispatch = useDispatch()
  const handleVote = () => {
    dispatch(vote(id))
    notification(`you voted for '${content}'`, dispatch)
  }

  return <div className='anecdote' id={`anec-${id}`}>
    <div>{content}</div>
    <div>
      has {votes}
      <button className='btn-vote' onClick={handleVote}>vote</button>
    </div>
  </div>
}

export default Anecdote
