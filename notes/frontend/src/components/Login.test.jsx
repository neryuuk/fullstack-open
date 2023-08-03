import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from './Login'
import userEvent from '@testing-library/user-event'

describe('<Login />', () => {
  test('renders correctly', async () => {
    const { container } = render(<Login {...{
      handleLogin: () => { },
      handleLogout: () => { },
    }} />)

    expect(container.querySelector('#username')).toBeDefined()
    expect(container.querySelector('#password')).toBeDefined()
    expect(container.querySelector('button[type="submit"]')).toBeDefined()
  })

  test('call login', async () => {
    const handleLogin = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Login {...{ handleLogin, handleLogout: () => { } }} />)
    const username = container.querySelector('#username')
    const password = container.querySelector('#password')
    const submit = container.querySelector('button[type="submit"]')

    await user.type(username, 'username')
    await user.type(password, 'password')
    await user.click(submit)

    expect(username).toBeDefined()
    expect(password).toBeDefined()
    expect(submit).toBeDefined()
    expect(handleLogin.mock.calls).toHaveLength(1)
    expect(handleLogin.mock.calls[0][0].username).toBe('username')
    expect(handleLogin.mock.calls[0][0].password).toBe('password')
  })

  test('call logout', async () => {
    const handleLogout = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Login {...{
      user: { name: 'User' },
      handleLogin: () => { },
      handleLogout,
    }} />)

    await user.click(container.querySelector('#logout'))

    expect(handleLogout.mock.calls).toHaveLength(1)
  })
})
