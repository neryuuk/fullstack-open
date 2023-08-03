import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Notification from './Notification'

describe('<Notification />', () => {
  test('renders correctly with message', async () => {
    const { container } = render(<Notification message='This is a notification' />)
    const element = container.querySelector('.error')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent('This is a notification')
  })

  test('empty without message', async () => {
    const { container } = render(<Notification />)

    expect(container.querySelector('.error')).toBe(null)
  })
})
