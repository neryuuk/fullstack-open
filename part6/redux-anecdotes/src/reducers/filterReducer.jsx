import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter (_, { payload }) { return payload },
  },
})

export default slice.reducer

export const { filter } = slice.actions
