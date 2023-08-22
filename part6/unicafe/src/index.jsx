import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'
import Button from './components/Button'
import Statistics from './components/Statistics'
import './index.css'

const store = createStore(counterReducer)

const handleAction = (type) => {
  store.dispatch({ type })
}

const App = () => {
  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <Button id='good' text='good' action={() => handleAction('GOOD')} />
        <Button id='neutral' text='neutral' action={() => handleAction('NEUTRAL')} />
        <Button id='bad' text='bad' action={() => handleAction('BAD')} />
        <Button id='reset' text='reset stats' action={() => handleAction('ZERO')} />
      </p>

      <h1>statistics</h1>
      <Statistics {...store.getState()} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => { root.render(<App />) }

renderApp()
store.subscribe(renderApp)
