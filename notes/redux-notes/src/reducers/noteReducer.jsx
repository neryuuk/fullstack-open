import { createSlice } from '@reduxjs/toolkit'
import { get, post } from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    switchImportant (state, { payload }) {
      return state.map(item => {
        if (item.id !== payload) return item
        return { ...item, important: !item.important }
      })
    },
    append (state, { payload }) {
      state.push(payload)
    },
    setNotes (_, { payload }) {
      return payload
    },
  },
})

export const initialize = () => {
  return async dispatch => {
    dispatch(setNotes(await get()))
  }
}

export const create = content => {
  return async dispatch => {
    dispatch(append(await post(content)))
  }
}

export default noteSlice.reducer

export const { switchImportant, append, setNotes } = noteSlice.actions
