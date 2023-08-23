import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdotes from './reducers/anecdoteReducer'
import filter from './reducers/filterReducer'
import './index.css'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider store={createStore(combineReducers({ anecdotes, filter }))}>
    <App />
  </Provider>)
