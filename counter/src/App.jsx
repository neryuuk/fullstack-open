/* eslint indent: ['error', 2, { 'SwitchCase': 1 }] */
import { useReducer } from 'react'
import { Provider } from './CounterContext'
import Button from './component/Button'
import Display from './component/Display'

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

  return (
    <Provider value={[counter, counterDispatch]}>
      <Display />
      <Button type='+' />
      <Button type='-' />
      <Button type='0' />
    </Provider>
  )
}

export default App
