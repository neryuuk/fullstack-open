import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    create (state, { payload }) { state.push(payload) },
    vote (state, { payload }) {
      return state.map(item => {
        if (item.id !== payload) return item
        return { ...item, votes: item.votes + 1 }
      }).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes (_, { payload }) {
      return payload.sort((a, b) => b.votes - a.votes)
    },
  },
})

export default anecdoteSlice.reducer

export const { create, vote, setAnecdotes } = anecdoteSlice.actions
