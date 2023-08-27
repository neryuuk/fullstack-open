import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { get } from './services/requests'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['anecdotes'],
    queryFn: get,
    retry: 2,
  })

  if (anecdotes.isLoading) return <h2>loading data...</h2>
  if (anecdotes.isError) return <h2>anecdote service not available due to problems in server</h2>

  return <div>
    <h3>Anecdote app</h3>

    <Notification />
    <AnecdoteForm />

    {anecdotes.data.map(anecdote => <div className='anecdote' key={anecdote.id}>
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
