import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, put } from '../services/anecdotes'

const concatState = (state, { payload }) => state.concat(payload)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers (builder) {
    builder.addCase(initialize.fulfilled, concatState)
    builder.addCase(create.fulfilled, concatState)
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      return state.map(item => {
        return (item.id === payload.id) ? payload : item
      }).sort((a, b) => b.votes - a.votes)
    })
  },
})

export const initialize = createAsyncThunk('anecdotes/initialize', async () => {
  return (await get()).sort((a, b) => b.votes - a.votes)
})

export const create = createAsyncThunk('anecdotes/create', post)

export const vote = createAsyncThunk('anecdotes/vote', put)

export default anecdoteSlice.reducer
