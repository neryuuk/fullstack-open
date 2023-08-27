import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, post } from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    switchImportant (state, { payload }) {
      return state.map(item => {
        return (item.id === payload)
          ? { ...item, important: !item.important }
          : item
      })
    },
  },
  extraReducers (builder) {
    builder.addCase(initialize.fulfilled, (_, { payload }) => payload)
    builder.addCase(create.fulfilled, (state, { payload }) => state.concat(payload))
  },
})

export const initialize = createAsyncThunk('anecdotes/initialize', get)

export const create = createAsyncThunk('anecdotes/create', post)

export default noteSlice.reducer

export const { switchImportant } = noteSlice.actions
