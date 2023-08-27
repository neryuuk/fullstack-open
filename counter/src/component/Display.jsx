import { useCounterValue } from '../CounterContext'

export const Display = () => {
  const counter = useCounterValue()
  return <p>{counter}</p>
}

export default Display
