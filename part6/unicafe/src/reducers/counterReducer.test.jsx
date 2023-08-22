import '@testing-library/react'
import deepFreeze from 'deep-freeze'
import counterReducer, { INITIAL, GOOD, NEUTRAL, BAD, ZERO } from './counterReducer'

describe('unicafe reducer', () => {
  test('should return a proper initial state when called with undefined', () => {
    const newState = counterReducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toEqual(INITIAL)
  })

  test('good is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, GOOD)
    expect(newState).toEqual({ good: 1, neutral: 0, bad: 0 })
  })

  test('neutral is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, NEUTRAL)
    expect(newState).toEqual({ good: 0, neutral: 1, bad: 0 })
  })

  test('bad is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, BAD)
    expect(newState).toEqual({ good: 0, neutral: 0, bad: 1 })
  })

  test('return to initial state', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    let newState = counterReducer(state, GOOD)
    newState = counterReducer(newState, NEUTRAL)
    newState = counterReducer(newState, BAD)
    expect(newState).toEqual({ good: 1, neutral: 1, bad: 1 })

    newState = counterReducer(newState, ZERO)
    expect(newState).toEqual(INITIAL)
  })
})
