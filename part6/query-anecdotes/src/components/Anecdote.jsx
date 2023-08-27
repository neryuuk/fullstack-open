import { useMutation, useQueryClient } from '@tanstack/react-query'
import { put } from '../services/requests'
import { useDispatch } from '../Context'

const Anecdote = ({ id, content, votes }) => {
  const client = useQueryClient()
  const dispatch = useDispatch()
  const vote = useMutation(put, {
    onSuccess: (_, updated) => {
      const anecdotes = client.getQueryData(['anecdotes'])
      client.setQueryData(['anecdotes'], anecdotes.map(anecdote => {
        return anecdote.id === updated.id ? updated : anecdote
      }))
      dispatch({ type: 'notify', payload: `anecdote '${content}' voted` })
      setTimeout(() => { dispatch({ type: 'clear' }) }, 5000)
    },
    onError: (error) => {
      dispatch({ type: 'notify', payload: `failed to vote: '${error.message}'` })
      setTimeout(() => { dispatch({ type: 'clear' }) }, 5000)
    },
  })

  const handleVote = () => { vote.mutate({ id, content, votes: votes + 1 }) }

  return <div className='anecdote'>
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
