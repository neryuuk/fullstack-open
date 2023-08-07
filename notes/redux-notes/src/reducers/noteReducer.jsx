export const noteReducer = (state = [], { type, payload }) => {
  if (type === 'NEW_NOTE') {
    return [...state, payload]
  }

  if (type === 'TOGGLE_IMPORTANCE') {
    return state.map(item => {
      if (item.id !== payload.id) return item
      return { ...item, important: !item.important }
    })
  }

  return state
}

export default noteReducer
