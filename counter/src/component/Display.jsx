import { useContext } from 'react'
import { CounterContext } from '../CounterContext'

export const Display = () => {
  const [counter] = useContext(CounterContext)
  return <p>{counter}</p>
}

export default Display
