import '@testing-library/react'
import deepFreeze from 'deep-freeze'
import noteReducer from './noteReducer'

describe('noteReducer', () => {
  test('returns new state with action notes/createNote', () => {
    const state = []
    const action = {
      type: 'notes/createNote',
      payload: 'the app state is in redux store',
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(item => item.content)).toContainEqual(action.payload)
  })

  test('switch state with action notes/toggleImportanceOf', () => {
    const state = [{
      content: 'the app state is in redux store',
      important: true,
      id: 1,
    }, {
      content: 'state changes are made with actions',
      important: false,
      id: 2,
    }]

    const action = {
      type: 'notes/toggleImportanceOf',
      payload: 2,
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2,
    })
  })
})
