/* eslint indent: ['error', 2, { SwitchCase: 1 }] */

export const SET_FILTER = 'SET_FILTER'

export const filterReducer = (state = '', { type, payload }) => {
  switch (type) {
    case SET_FILTER:
      return payload
    default:
      return state
  }
}

export const filter = payload => {
  return { type: SET_FILTER, payload }
}

export default filterReducer
