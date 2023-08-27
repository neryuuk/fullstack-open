import { useMutation, useQueryClient } from '@tanstack/react-query'
import { post } from '../services/requests'
import { useDispatch } from '../Context'

const AnecdoteForm = () => {
  const client = useQueryClient()
  const dispatch = useDispatch()
  const anecdote = useMutation(post, {
    onSuccess: newAnecdote => {
      const anecdotes = client.getQueryData(['anecdotes'])
      client.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const onCreate = event => {
    event.preventDefault()
    anecdote.mutate({ content: event.target.anecdote.value, votes: 0 })
    dispatch({ type: 'notify', payload: `created anecdote '${event.target.anecdote.value}'` })
    setTimeout(() => { dispatch({ type: 'clear' }) }, 5000)
    event.target.anecdote.value = ''
  }

  return <div>
    <h3>create new</h3>
    <form onSubmit={onCreate}>
      <div>
        <input name='anecdote' id='anecdote' />
        <button className='btn-submit' type='submit'>create</button>
      </div>
    </form>
  </div>
}

export default AnecdoteForm
