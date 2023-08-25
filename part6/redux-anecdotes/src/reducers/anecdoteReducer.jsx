import { createSlice } from '@reduxjs/toolkit'

const asObject = content => {
  return {
    id: (1000 * Math.random()).toFixed(0),
    votes: 0,
    content,
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create (state, { payload }) { state.push(asObject(payload)) },
    vote (state, { payload }) {
      return state.map(item => {
        if (item.id !== payload) return item
        return { ...item, votes: item.votes + 1 }
      }).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes (_, { payload }) {
      return payload
    },
  },
})

export default anecdoteSlice.reducer

export const { create, vote, setAnecdotes } = anecdoteSlice.actions
