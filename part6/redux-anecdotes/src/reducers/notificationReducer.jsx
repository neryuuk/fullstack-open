import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'Notification initial state',
  reducers: {
    notify (_, { payload }) {
      return payload
    },
  },
})

export default notificationSlice.reducer

export const { notify } = notificationSlice.actions
