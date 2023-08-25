import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { put } from '../services/anecdotes'
const MAX_LEN = 70

export const Anecdote = ({ id, content, votes }) => {
  const dispatch = useDispatch()
  const handleVote = async () => {
    const updated = await put({ id, content, votes: votes + 1 })
    dispatch(vote(updated.id))
    const short = content.length < MAX_LEN ? content : `${content.substr(0, MAX_LEN - 10)}...`
    notification(`you voted for '${short}'`, dispatch)
  }

  return <div className='anecdote' id={`anec-${id}`}>
    <div>{content}</div>
    <div>
      has {votes}
      <button className='btn-vote' onClick={handleVote}>{votes === 1 ? 'vote' : 'votes'}</button>
    </div>
  </div>
}

export default Anecdote
