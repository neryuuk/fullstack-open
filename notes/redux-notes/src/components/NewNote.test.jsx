import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import NewNote from './NewNote'
import noteReducer from '../reducers/noteReducer'

describe('<NewNote />', () => {
  test('renders correctly', () => {
    const { container } = render(<Provider store={createStore(noteReducer)}><NewNote /></Provider>)
    const element = container.querySelector('button#note-submit')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent('add')
  })
})
