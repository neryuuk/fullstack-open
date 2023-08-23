import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'
import './index.css'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider store={createStore(reducer)}><App /></Provider>)
