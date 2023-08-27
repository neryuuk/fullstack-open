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
      dispatch({ type: 'notify', payload: `created anecdote '${newAnecdote.content}'` })
      setTimeout(() => { dispatch({ type: 'clear' }) }, 5000)
    },
    onError: error => {
      dispatch({ type: 'notify', payload: `failed to create anecdote: '${error.message}'` })
      setTimeout(() => { dispatch({ type: 'clear' }) }, 5000)
    },
  })

  const onCreate = event => {
    event.preventDefault()
    anecdote.mutate({ content: event.target.anecdote.value, votes: 0 })
    event.target.anecdote.value = ''
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={onCreate}>
      <div>
        <input name='anecdote' id='anecdote' />
        <button className='btn-submit' type='submit'>create</button>
      </div>
    </form>
  </div>
}

export default AnecdoteForm
