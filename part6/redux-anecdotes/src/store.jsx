import { configureStore } from '@reduxjs/toolkit'
import anecdotes from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'

export const store = configureStore({ reducer: { anecdotes, filter } })

export default store
