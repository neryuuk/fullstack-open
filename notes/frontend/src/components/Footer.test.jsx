import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './Footer'

describe('<Footer />', () => {
  test('renders correctly', async () => {
    const { container } = render(<Footer />)

    expect(container.querySelector('#footer')).toBeDefined()
  })
})
