/* eslint indent: ['error', 2, { SwitchCase: 1 }] */

import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000).toFixed(0))

const initialState = [{
  content: 'reducer defines how redux store works',
  important: true,
  id: generateId(),
}, {
  content: 'state of store can contain any data',
  important: false,
  id: generateId(),
}]

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote (state, { payload }) {
      state.push({
        content: payload,
        important: false,
        id: generateId(),
      })
    },
    toggleImportanceOf (state, { payload }) {
      return state.map(item => {
        if (item.id !== payload) return item
        return { ...item, important: !item.important }
      })
    },
  },
})

export default noteSlice.reducer

export const { createNote, toggleImportanceOf } = noteSlice.actions
