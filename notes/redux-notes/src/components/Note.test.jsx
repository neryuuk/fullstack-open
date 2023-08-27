import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Note from './Note'
import noteReducer from '../reducers/noteReducer'

describe('<Note />', () => {
  const ID = '3535'
  const CONTENT = 'this new note'

  test('renders important note correctly', () => {
    const { container } = render(<Provider store={createStore(noteReducer)}>
      <Note id={ID} content={CONTENT} important={true} />
    </Provider>)
    const element = container.querySelector(`li#note-${ID}`)

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(CONTENT)
    expect(element).toHaveTextContent('is important')
  })

  test('renders not important note correctly', () => {
    const { container } = render(<Provider store={createStore(noteReducer)}>
      <Note id={ID} content={CONTENT} important={false} />
    </Provider>)
    const element = container.querySelector(`li#note-${ID}`)

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(CONTENT)
  })
})
