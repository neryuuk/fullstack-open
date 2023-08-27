import { configureStore } from '@reduxjs/toolkit'
import notes from './reducers/noteReducer'
import filter from './reducers/filterReducer'

export const store = configureStore({ reducer: { notes, filter } })

export default store
