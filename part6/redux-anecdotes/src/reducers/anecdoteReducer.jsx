import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post } from '../services/anecdotes'

const concatState = (state, { payload }) => state.concat(payload)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote (state, { payload }) {
      return state.map(item => {
        if (item.id !== payload) return item
        return { ...item, votes: item.votes + 1 }
      }).sort((a, b) => b.votes - a.votes)
    },
  },
  extraReducers (builder) {
    builder.addCase(initialize.fulfilled, concatState)
    builder.addCase(create.fulfilled, concatState)
  },
})

export const initialize = createAsyncThunk('anecdotes/initialize', async () => {
  return (await get()).sort((a, b) => b.votes - a.votes)
})

export const create = createAsyncThunk('anecdotes/create', post)

export default anecdoteSlice.reducer

export const { vote } = anecdoteSlice.actions
