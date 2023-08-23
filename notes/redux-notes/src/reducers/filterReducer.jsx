/* eslint indent: ['error', 2, { SwitchCase: 1 }] */

import { ALL, SET_FILTER } from '../actions/filterAction'

export const filterReducer = (state = ALL, { type, payload }) => {
  switch (type) {
    case 'SET_FILTER':
      return payload
    default:
      return state
  }
}

export const toggleFilter = payload => {
  return {
    type: SET_FILTER,
    payload,
  }
}

export default filterReducer
