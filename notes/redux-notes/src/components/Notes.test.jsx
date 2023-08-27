import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Notes from './Notes'
import noteReducer, { createNote } from '../reducers/noteReducer'

describe('<Notes />', () => {
  test('renders notes correctly', async () => {
    const CONTENT_1 = 'this is note 1'
    const CONTENT_2 = 'this is note 2'
    const store = createStore(noteReducer)
    await store.dispatch(createNote(CONTENT_1))
    await store.dispatch(createNote(CONTENT_2))

    const { container } = render(<Provider store={store}>
      <Notes />
    </Provider>)
    const element = container.querySelector('ul#notes')

    expect(element).toBeDefined()
    expect(element.firstChild).toHaveTextContent(CONTENT_1)
    expect(element.lastChild).toHaveTextContent(CONTENT_2)
  })
})
