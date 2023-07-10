import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Feedback = ({ text, count, percent }) => (
  <p>{text} {count} {percent && '%'}</p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' handleClick={() => setBad(bad + 1)} />

      <h1>statistics</h1>
      <Feedback text='good' count={good} />
      <Feedback text='neutral' count={neutral} />
      <Feedback text='bad' count={bad} />
      <Feedback text='all' count={total} />
      <Feedback text='average' count={good - bad} />
      <Feedback text='positive' count={(good * 100) / (total)} percent />
    </div>
  )
}

export default App
