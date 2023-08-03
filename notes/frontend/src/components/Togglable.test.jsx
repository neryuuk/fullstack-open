import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  const ref = React.createRef()
  let container

  beforeEach(() => {
    container = render(<Togglable ref={ref} buttonLabel="show...">
      <div className="testDiv" >
        togglable content
      </div>
    </Togglable>).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    expect(container.querySelector('.togglable'))
      .toHaveStyle('display: none;')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('show...'))

    expect(container.querySelector('.togglable'))
      .not.toHaveStyle('display: none;')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    expect(container.querySelector('.togglable'))
      .toHaveStyle('display: none;')
  })

  test('togglableVisibility reference', () => {
    act(() => ref.current.toggleVisibility())
    expect(container.querySelector('.testDiv')).toBeVisible()
  })
})
