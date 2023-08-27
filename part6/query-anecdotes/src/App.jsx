import { useQuery } from '@tanstack/react-query'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { get } from './services/requests'
import { Provider } from './Context'

const App = () => {
  const result = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['anecdotes'],
    queryFn: get,
    retry: 2,
  })

  if (result.isLoading) return <h2>loading data...</h2>
  if (result.isError) return <h2>anecdote service not available due to problems in server</h2>

  return <Provider>
    <h3>Anecdote app</h3>

    <Notification />
    <AnecdoteForm />
    <Anecdotes data={(result.data || []).sort((a, b) => b.votes - a.votes)} />
  </Provider>
}

export default App
