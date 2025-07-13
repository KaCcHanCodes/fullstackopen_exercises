import { useState } from 'react'

const Heading = ({heading}) => <h1>{heading}</h1>

const SubHeading = ({subHeading}) => <h2>{subHeading}</h2>

const Anecdote = ({anecdotes}) => <div>{anecdotes}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const heading = 'Anecdote of the day'
  const subHeading = 'Anecdote with most votes'
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

const [selected, setSelected] = useState(0)
const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
const [maxVote, setMaxVote] = useState(0)

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return (Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled))
}

const handleClick = () => {
  const random = getRandomInt(0,anecdotes.length)
  setSelected(random)
}

const handleVote = () => {
  const copyVote = [...vote]
  copyVote[selected] += 1
  setVote(copyVote)
  const value = Math.max(...copyVote)
  const max = copyVote.indexOf(value)
  setMaxVote(max)
}

  return (
    <div>
      <Heading heading = {heading}/>
      <Anecdote anecdotes = {anecdotes[selected]}/>
      <p>has {vote[selected]} votes</p>
      <Button onClick = {handleVote} text = 'vote'/>
      <Button onClick = {handleClick} text = 'next anecdote'/>
      <SubHeading subHeading = {subHeading}/>
      <p>{anecdotes[maxVote]}</p>
      <p>has {vote[maxVote]} votes</p>
    </div>
  )
}

export default App