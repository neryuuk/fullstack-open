/* eslint indent: ['error', 2, { SwitchCase: 1 }] */

import { createSlice } from '@reduxjs/toolkit'

export const ALL = 'ALL'

export const IMPORTANT = 'IMPORTANT'

const filterSlice = createSlice({
  name: 'notes',
  initialState: ALL,
  reducers: {
    toggleFilter (_, { payload }) {
      return payload
    },
  },
})

export default filterSlice.reducer

export const { toggleFilter } = filterSlice.actions
