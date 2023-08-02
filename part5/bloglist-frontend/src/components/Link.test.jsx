import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Link } from './Link'
import userEvent from '@testing-library/user-event'

describe('<Link />', () => {
  test('renders correctly', async () => {
    const { container } = render(<Link action={() => { }} text='This is a button' />)
    const element = container.querySelector('.anchor')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent('This is a button')
  })

  test('call action correclty', async () => {
    const handleAction = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Link action={handleAction} text='This is a button' />)

    await user.click(container.querySelector('.anchor'))

    expect(handleAction.mock.calls).toHaveLength(1)
  })
})
