import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = [
    {
      'content': 'If it hurts, do it more often',
      'id': '47145',
      'votes': 0,
    },
  ]

  return <div>
    <h3>Anecdote app</h3>

    <Notification />
    <AnecdoteForm />

    {anecdotes.map(anecdote => <div className='anecdote' key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button className='btn-vote' onClick={() => handleVote(anecdote)}>
          {anecdote.votes === 1 ? 'vote' : 'votes'}
        </button>
      </div>
    </div>)}
  </div>
}

export default App
