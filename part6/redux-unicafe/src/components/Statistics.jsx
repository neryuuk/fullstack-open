import StatisticLine from './StatisticLine'

export const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad

  if (total === 0) return <p id='no-feedback'>No feedback given</p>

  return <table id='feedback'><tbody>
    <StatisticLine id='good' text='good' value={good} />
    <StatisticLine id='neutral' text='neutral' value={neutral} />
    <StatisticLine id='bad' text='bad' value={bad} />
    <StatisticLine id='all' text='all' value={total} />
    <StatisticLine id='average' text='average' value={(good - bad) / (total)} />
    <StatisticLine id='positive' text='positive' value={`${(good * 100) / (total)} %`} />
  </tbody></table>
}

export default Statistics
