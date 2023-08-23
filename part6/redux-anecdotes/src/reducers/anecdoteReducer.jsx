import { VOTE, CREATE } from '../actions/anecdoteAction'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = content => {
  return {
    id: getId(),
    votes: 0,
    content,
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const reducer = (state = initialState, { type, payload }) => {
  if (type === CREATE) {
    return [...state, asObject(payload)]
  }

  if (type === VOTE) {
    return state.map(item => {
      if (item.id !== payload.id) return item
      return { ...item, votes: item.votes + 1 }
    })
  }

  return state
}

export default reducer
