import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Button from './Button'
import userEvent from '@testing-library/user-event'

describe('<Button />', () => {
  test('renders correctly', async () => {
    const { container } = render(<Button id='btn' action={() => { }} text='This is a button' />)
    const element = container.querySelector('#btn')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent('This is a button')
  })

  test('call action correclty', async () => {
    const handleAction = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Button id='btn' action={handleAction} text='This is a button' />)

    await user.click(container.querySelector('#btn'))

    expect(handleAction.mock.calls).toHaveLength(1)
  })
})
