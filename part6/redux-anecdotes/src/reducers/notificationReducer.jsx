import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    notify (state, { payload }) { return state.concat(payload) },
    clear (state) { state.shift() },
  },
})

export default notificationSlice.reducer

const { notify, clear } = notificationSlice.actions

export const notification = (text, dispatch) => {
  dispatch(notify(text))
  setTimeout(() => { dispatch(clear()) }, 5000)
}
