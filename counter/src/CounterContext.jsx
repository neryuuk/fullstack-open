import { createContext, useContext, useReducer } from 'react'

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

export const CounterContext = createContext()

export const useCounterValue = () => {
  return useContext(CounterContext)[0]
}

export const useCounterDispatch = () => {
  return useContext(CounterContext)[1]
}

export const Provider = ({ children }) => {
  const [counter, counterDispatch] = useReducer(reducer, 0)

  return (
    <CounterContext.Provider value={[counter, counterDispatch] }>
      {children}
    </CounterContext.Provider>
  )
}
