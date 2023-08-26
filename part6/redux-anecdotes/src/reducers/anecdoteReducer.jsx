import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get } from '../services/anecdotes'

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
  },
  extraReducers (builder) {
    builder.addCase(
      initialize.fulfilled,
      (_, { payload }) => payload,
    )
  },
})

export const initialize = createAsyncThunk('anecdotes/initialize', async () => {
  return (await get()).sort((a, b) => b.votes - a.votes)
})

export default anecdoteSlice.reducer

export const { create, vote } = anecdoteSlice.actions
