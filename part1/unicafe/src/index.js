import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => <h1>{props.value}</h1>
const Display = ({name, value}) => <div>{name}: {value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newval) => {setGood(newval)} 
  const setToNeu = (newval) => {setNeutral(newval)} 
  const setToBad = (newval) => {setBad(newval)} 

  return (
    <div>
      <Title value = {"Give a feedback!"} /> 
      <Button handleClick={() => setToGood(good+1)} text="good" />
      <Button handleClick={() => setToNeu(neutral+1)} text="neutral" />
      <Button handleClick={() => setToBad(bad+1)} text="bad" />

      <Title value = {"Statistics"} /> 
      <Display name = {"good"} value = {good} />
      <Display name = {"netural"} value = {neutral} />
      <Display name = {"bad"} value = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

