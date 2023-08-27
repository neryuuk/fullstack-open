/* eslint indent: ['error', 2, { 'SwitchCase': 1 }] */
import { useReducer } from 'react'

const reducer = (state = 0, { type }) => {
  switch (type) {
    case '+':
      return state + 1
    case '-':
      return state - 1
    case '0':
      return 0
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(reducer, 0)

  return <>
    <p>{counter}</p>
    <button onClick={() => counterDispatch({ type: '+' })}>plus</button>
    <button onClick={() => counterDispatch({ type: '-' })}>minus</button>
    <button onClick={() => counterDispatch({ type: '0' })}>zero</button>
  </>
}

export default App
