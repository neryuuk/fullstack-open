import Anecdote from './Anecdote'

const Anecdotes = ({ data }) => {
  return <>{
    data.map(item => <Anecdote {...item} key={item.id} />)
  }</>
}

export default Anecdotes
