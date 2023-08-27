import { useCounterDispatch } from '../CounterContext'

export const Button = ({ type }) => {
  const dispatch = useCounterDispatch()
  return (
    <button onClick={() => dispatch({ type })}>{type}</button>
  )
}

export default Button
