import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => ( 
  <button onClick={props.handleClick}>
      {props.text}
  </button>
)

const Anecdote = (props) => <div>{props.text}</div>
const Vote = (props) => {
    if(props.num <= 1)
      return <div>has {props.num} vote</div> 
    else if(props.num > 1)
      return <div>has {props.num} votes</div>
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(anecdotes.length)) 
  console.log(vote)
  console.log(selected)
  console.log(vote[selected])

  const anecdoteClick = () => {
    let pickedInt = Math.floor(Math.random() * Math.floor(anecdotes.length)) 
    while(pickedInt === selected) 
      pickedInt = Math.floor(Math.random() * Math.floor(anecdotes.length)) 
    setSelected(pickedInt)
  } 

  const voteClick = () => { 
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  } 

  return (
    <div>
      <Anecdote text={anecdotes[selected]} />
      <Vote num={vote[selected]} />
      <Button handleClick={anecdoteClick} text={"next anecdote"} />
      <Button handleClick={voteClick} text={"vote"}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)