import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post, put } from '../services/anecdotes'

const name = 'anecdotes'

const slice = createSlice({
  name,
  initialState: [],
  reducers: {},
  extraReducers (builder) {
    builder.addCase(initialize.fulfilled, (state, { payload }) => {
      return payload ? payload.sort((a, b) => b.votes - a.votes) : state
    })
    builder.addCase(create.fulfilled, (state, { payload }) => {
      return payload ? state.concat(payload) : state
    })
    builder.addCase(vote.fulfilled, (state, { payload }) => {
      return state.map(item => {
        return (item.id === payload.id) ? payload : item
      }).sort((a, b) => b.votes - a.votes)
    })
  },
})

export const initialize = createAsyncThunk(`${name}/initialize`, get)

export const create = createAsyncThunk(`${name}/create`, post)

export const vote = createAsyncThunk(`${name}/vote`, put)

export default slice.reducer
