import { useContext } from 'react'
import { CounterContext } from '../CounterContext'

export const Button = ({ type }) => {
  const [, dispatch] = useContext(CounterContext)
  return (
    <button onClick={() => dispatch({ type })}>{type}</button>
  )
}

export default Button
