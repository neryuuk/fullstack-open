import { createContext, useContext, useReducer } from 'react'

const reducer = (state = '', { type, payload }) => {
  switch (type) {
    case 'notify':
      return payload
    case 'clear':
      return ''
    default:
      return state
  }
}

export const Context = createContext()

export const useValue = () => {
  return useContext(Context)[0]
}

export const useDispatch = () => {
  return useContext(Context)[1]
}

export const Provider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(reducer, 0)

  return <Context.Provider value={[notification, notificationDispatch]}>
    {children}
  </Context.Provider>
}
