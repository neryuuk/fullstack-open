import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

export const Anecdote = ({ id, content, votes }) => {
  const dispatch = useDispatch()
  const handleVote = async () => {
    dispatch(vote({ id, content, votes: votes + 1 }))
    dispatch(notification(`you voted for ${content}`, 5))
  }

  return <div className='anecdote' id={`anec-${id}`}>
    <div>{content}</div>
    <div>
      has {votes}
      <button className='btn-vote' onClick={handleVote}>
        {votes === 1 ? 'vote' : 'votes'}
      </button>
    </div>
  </div>
}

export default Anecdote
