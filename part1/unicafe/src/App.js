import { useState } from 'react'

const Header = ({ name }) => { return (<h1> {name}</h1>) }

const Button = ({ onClick, text }) => (<button onClick={onClick}> {text} </button>)

const StatisticLine = (props) => (<tr><th>{props.text}</th><th>{props.value}</th></tr>)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (0 === all) return (<p>No feedback given</p>)
  const average = (all === 0 ? 0 : (good - bad) / all)
  const positive = (all === 0 ? 0 : good / all)
  return (
    <>
      <Header name="statistics" />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive * 100 + '%'} />
        </tbody>
      </table>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = { good, neutral, bad }

  return (
    <div>
      <Header name="give feedback" />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics {...statistics} />
    </div>
  )
}

export default App
