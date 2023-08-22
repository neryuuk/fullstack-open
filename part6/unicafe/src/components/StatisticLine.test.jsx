import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StatisticLine from './StatisticLine'

describe('<StatisticLine />', () => {
  test('renders correctly', async () => {
    const TEXT = 'line text'
    const VALUE = 15
    const { container } = render(<table><tbody>
      <StatisticLine id='line' text={TEXT} value={VALUE} />
    </tbody></table>)

    expect(container.querySelector('tr#line')).toBeDefined()
    expect(container.querySelector('td#text-line')).toHaveTextContent(TEXT)
    expect(container.querySelector('td#value-line')).toHaveTextContent(VALUE)
  })
})
