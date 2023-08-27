import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async event => {
    event.preventDefault()
    dispatch(create(event.target.anecdote.value))
    dispatch(notification(`Created note: '${event.target.anecdote.value}'`, 5))
    event.target.anecdote.value = ''
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div>
        <input name='anecdote' id='anecdote' />
        <button className='btn-submit'>create</button>
      </div>
    </form>
  </div>
}

export default AnecdoteForm
