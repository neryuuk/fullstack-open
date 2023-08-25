import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    notify (_, { payload }) { return payload },
    clear () { return null },
  },
})

export default notificationSlice.reducer

const { notify, clear } = notificationSlice.actions

export const notification = (text, dispatch) => {
  dispatch(notify(text))
  setTimeout(() => { dispatch(clear()) }, 5000)
}
