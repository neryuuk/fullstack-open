import { createSlice } from '@reduxjs/toolkit'

export const SET_FILTER = 'SET_FILTER'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter (_, { payload }) {
      return payload
    },
  },
})

export default filterSlice.reducer

export const { filter } = filterSlice.actions
