import { GOOD, NEUTRAL, BAD, ZERO } from '../actions/counterAction'

export const INITIAL = { good: 0, neutral: 0, bad: 0 }

export const counterReducer = (state = INITIAL, { type }) => {
  switch (type) {
    case GOOD:
      return { ...state, good: state.good + 1 }
    case NEUTRAL:
      return { ...state, neutral: state.neutral + 1 }
    case BAD:
      return { ...state, bad: state.bad + 1 }
    case ZERO:
      return { ...INITIAL }
    default:
      return state
  }
}

export default counterReducer
