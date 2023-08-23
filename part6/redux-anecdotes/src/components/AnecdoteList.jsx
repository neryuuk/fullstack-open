import { useSelector } from 'react-redux'
import Anecdote from '../components/Anecdote'

export const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter.trim()) return anecdotes
    return anecdotes.filter(item => {
      return item.content.toLowerCase().includes(filter.toLowerCase())
    })
  })

  return <>
    {anecdotes.map(anecdote => <Anecdote {...anecdote} key={anecdote.id} />)}
  </>
}

export default AnecdoteList
