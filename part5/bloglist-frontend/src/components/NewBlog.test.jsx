import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './NewBlog'

describe('<Blog />', () => {
  let container
  const handleBlog = jest.fn()

  beforeEach(() => {
    container = render(<NewBlog {...{ handleBlog }} />).container
  })

  test('updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()

    await user.type(container.querySelector('#title'), 'A Blog Title')
    await user.type(container.querySelector('#author'), 'Author McAuthor')
    await user.type(container.querySelector('#url'), 'https://google.com')
    await user.click(container.querySelector('button[type="submit"]'))

    expect(handleBlog.mock.calls).toHaveLength(1)
    expect(handleBlog.mock.calls[0][0].title).toBe('A Blog Title')
    expect(handleBlog.mock.calls[0][0].author).toBe('Author McAuthor')
    expect(handleBlog.mock.calls[0][0].url).toBe('https://google.com')
  })
})
