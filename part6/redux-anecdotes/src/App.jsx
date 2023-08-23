// import { useSelector, useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
  }

  return <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote => <p key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </p>)}
    <h2>create new</h2>
    <form>
      <div>
        <input />
        <button>create</button>
      </div>
    </form>
  </div>
}

export default App
