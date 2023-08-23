import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()
  const addAnecdote = event => {
    event.preventDefault()
    dispatch(create(event.target.anecdote.value))
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

export default NewAnecdote
