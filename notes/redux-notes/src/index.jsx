import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import notes from './reducers/noteReducer'
import filter from './reducers/filterReducer'
import './index.css'

const store = createStore(combineReducers({ notes, filter }))

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider store={store}><App /></Provider>)
