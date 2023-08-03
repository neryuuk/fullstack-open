import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

describe('<Note />', () => {
  test('renders content', () => {
    const note = {
      content: 'Testing Note Component',
      important: false,
    }

    render(<Note note={note} />)

    const element = screen.getByText('Testing Note Component')
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('Testing Note Component')
  })

  test('clicking the button calls event handler once', async () => {
    const mockHandler = jest.fn()
    const note = {
      content: 'Testing Note Component',
      important: true,
    }

    render(<Note note={note} toggleImportance={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
