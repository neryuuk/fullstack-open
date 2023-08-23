import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdotes from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'
import './index.css'

const store = configureStore({ reducer: { anecdotes, filter } })

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider store={store}>
    <App />
  </Provider>)
