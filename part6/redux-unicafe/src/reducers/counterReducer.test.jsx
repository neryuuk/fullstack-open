import '@testing-library/react'
import deepFreeze from 'deep-freeze'
import { INITIAL, counterReducer } from './counterReducer'
import { GOOD, NEUTRAL, BAD, ZERO } from '../actions/counterAction'

describe('unicafe reducer', () => {
  test('should return a proper initial state when called with undefined', () => {
    const newState = counterReducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toEqual(INITIAL)
  })

  test('good is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, { type: GOOD })
    expect(newState).toEqual({ good: 1, neutral: 0, bad: 0 })
  })

  test('neutral is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, { type: NEUTRAL })
    expect(newState).toEqual({ good: 0, neutral: 1, bad: 0 })
  })

  test('bad is incremented', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    const newState = counterReducer(state, { type: BAD })
    expect(newState).toEqual({ good: 0, neutral: 0, bad: 1 })
  })

  test('return to initial state', () => {
    const state = { ...INITIAL }
    deepFreeze(state)

    let newState = counterReducer(state, { type: GOOD })
    newState = counterReducer(newState, { type: NEUTRAL })
    newState = counterReducer(newState, { type: BAD })
    expect(newState).toEqual({ good: 1, neutral: 1, bad: 1 })

    newState = counterReducer(newState, { type: ZERO })
    expect(newState).toEqual(INITIAL)
  })
})
