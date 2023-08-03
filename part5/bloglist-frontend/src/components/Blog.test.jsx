import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'

describe('<Blog />', () => {
  let container
  const handleLike = jest.fn()
  const handleDelete = jest.fn()

  beforeEach(() => {
    const blog = {
      id: '64ba9b35a9cea045d48a6913',
      title: 'A Blog Title',
      author: 'Author McAuthor',
      url: 'https://google.com',
      likes: 42,
      user: {
        id: '64beeecf1d32c2398f519d66',
        username: 'username',
        name: 'user name',
      },
    }

    container = render(<Blog {...{ blog, user: blog.user, handleLike, handleDelete }} />).container
  })

  test('renders content', () => {
    const element = screen.getByText('A Blog Title Author McAuthor', { exact: false })
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('A Blog Title Author McAuthor')
    expect(container.querySelector('blog-url')).toBe(null)
    expect(container.querySelector('blog-likes')).toBe(null)
  })

  test('display url and likes upon click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container.querySelector('blog-url')).toBeDefined()
    expect(container.querySelector('blog-likes')).toBeDefined()
  })

  test('like button handling clicks', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
  })

  test('remove button confirm cancel', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const confirmSpy = jest.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(jest.fn(() => false))

    await user.click(screen.getByText('remove'))
    expect(handleDelete.mock.calls).toHaveLength(0)

    confirmSpy.mockRestore()
  })

  test('remove button confirm ok', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const confirmSpy = jest.spyOn(window, 'confirm')
    confirmSpy.mockImplementation(jest.fn(() => true))

    await user.click(screen.getByText('remove'))
    expect(handleDelete.mock.calls).toHaveLength(1)

    confirmSpy.mockRestore()
  })
})
