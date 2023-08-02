import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'

describe('<Blog />', () => {
  test('renders content', () => {
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

    const { container } = render(<Blog {...{
      blog,
      user: blog.user,
      handleLike: () => { },
      handleDelete: () => { },
    }} />)

    const element = screen.getByText('A Blog Title Author McAuthor', { exact: false })
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('A Blog Title Author McAuthor')
    expect(container.querySelector('blog-url')).toBe(null)
    expect(container.querySelector('blog-likes')).toBe(null)
  })
})
