import { NEW_NOTE, TOGGLE_IMPORTANCE } from '../actions/noteAction'

const generateId = () => Number((Math.random() * 1000).toFixed(0))

const initialState = [{
  content: 'reducer defines how redux store works',
  important: true,
  id: generateId(),
}, {
  content: 'state of store can contain any data',
  important: false,
  id: generateId(),
}]

export const noteReducer = (state = initialState, { type, payload }) => {
  if (type === NEW_NOTE) {
    return [...state, payload]
  }

  if (type === TOGGLE_IMPORTANCE) {
    return state.map(item => {
      if (item.id !== payload.id) return item
      return { ...item, important: !item.important }
    })
  }

  return state
}

export const createNote = content => {
  return {
    type: NEW_NOTE,
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

export const toggleImportanceOf = id => {
  return {
    type: TOGGLE_IMPORTANCE,
    payload: { id },
  }
}

export default noteReducer
