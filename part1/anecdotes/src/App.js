import { useState } from 'react'

const Button = ({ onClick, text }) => (<button onClick={onClick}> {text} </button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const updateVotes = () => {
    // update vote array
    const newVote = [...vote];
    newVote[selected]++;
    setVote(newVote);
    // update most voted anecdotes
    var maxIndex = mostVoted;
    var maxValue = newVote[mostVoted];
    for (var i = 0; i < newVote.length; i++) {
      if (newVote[i] > maxValue) {
        maxValue = newVote[i];
        maxIndex = i;
      }
    }
    setMostVoted(maxIndex);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button onClick={updateVotes} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
      <p>has {vote[mostVoted]} votes</p>
    </div>
  )
}

export default App
