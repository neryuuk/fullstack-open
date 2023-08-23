export const VOTE = 'VOTE'

export const CREATE = 'CREATE'

export const vote = id => {
  return {
    type: VOTE,
    payload: { id },
  }
}

export const create = payload => {
  return {
    type: CREATE,
    payload,
  }
}
