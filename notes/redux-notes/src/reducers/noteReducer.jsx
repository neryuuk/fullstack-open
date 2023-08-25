import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    create (state, { payload }) {
      state.push(payload)
    },
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

export default noteSlice.reducer

export const { create, switchImportant, append, setNotes } = noteSlice.actions
