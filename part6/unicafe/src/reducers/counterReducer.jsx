export const INITIAL = { good: 0, neutral: 0, bad: 0 }
export const GOOD = { type: 'GOOD' }
export const NEUTRAL = { type: 'NEUTRAL' }
export const BAD = { type: 'BAD' }
export const ZERO = { type: 'ZERO' }

const counterReducer = (state = INITIAL, { type }) => {
  console.log(type)
  switch (type) {
    case 'GOOD':
      return { ...state, good: state.good + 1 }
    case 'NEUTRAL':
      return { ...state, neutral: state.neutral + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      return { ...INITIAL }
    default:
      return state
  }
}

export default counterReducer
