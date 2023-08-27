import { createSlice } from '@reduxjs/toolkit'

const SECONDS = 1000
const MAX_LEN = 70

const slice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    notify (state, { payload }) {
      state[payload.id] = payload.text
      return state
    },
    clear (state, { payload }) {
      delete state[payload]
      return state
    },
  },
})

const { notify, clear } = slice.actions

export default slice.reducer

export const notification = (content, timeout = 5) => {
  return dispatch => {
    const id = `${Date.now()}` + (Math.random() * 10).toFixed(0).padStart(2, '0')
    const text = content.length < MAX_LEN
      ? content : `${content.substr(0, MAX_LEN - 10)}...`
    dispatch(notify({ id, text }))
    setTimeout(() => { dispatch(clear(id)) }, timeout * SECONDS)
  }
}
