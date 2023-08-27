import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Statistics from './Statistics'

describe('<Statistics />', () => {
  test('renders empty', async () => {
    const { container } = render(<Statistics good={0} bad={0} neutral={0} />)
    const element = container.querySelector('p#no-feedback')

    expect(element).toBeDefined()
    expect(element).toHaveTextContent('No feedback given')
  })

  test('renders one good feedback', async () => {
    const { container } = render(<Statistics good={1} bad={0} neutral={0} />)
    const value = container.querySelector('td#value-good')
    expect(value).toBeDefined()
    expect(value).toHaveTextContent('1')

    const average = container.querySelector('td#value-average')
    expect(average).toBeDefined()
    expect(average).toHaveTextContent('1')
  })

  test('renders one bad feedback', async () => {
    const { container } = render(<Statistics good={0} bad={1} neutral={0} />)
    const value = container.querySelector('td#value-bad')
    expect(value).toBeDefined()
    expect(value).toHaveTextContent('1')

    const average = container.querySelector('td#value-average')
    expect(average).toBeDefined()
    expect(average).toHaveTextContent('-1')
  })

  test('renders one neutral feedback', async () => {
    const { container } = render(<Statistics good={0} bad={0} neutral={1} />)
    const value = container.querySelector('td#value-neutral')
    expect(value).toBeDefined()
    expect(value).toHaveTextContent('1')

    const average = container.querySelector('td#value-average')
    expect(average).toBeDefined()
    expect(average).toHaveTextContent('0')
  })
})
