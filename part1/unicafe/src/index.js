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
  const [clicks, setClicks] = useState({
    good: 0, bad: 0, neutral: 0, all: 0
  })

  const handleclickgood = () => {
    const newClicks = { 
      ...clicks,
      good: clicks.good + 1, 
      all: clicks.all + 1
    }
    setClicks(newClicks)
  }

  const handleclickbad = () => {
    const newClicks = { 
      ...clicks,
      bad: clicks.bad + 1, 
      all: clicks.all +1
    }
    setClicks(newClicks)
  }

  const handleclickneu = () => {
    const newClicks = { 
      ...clicks,
      neutral: clicks.neutral + 1, 
      all: clicks.all +1
    }
    setClicks(newClicks)
  }

      console.log(clicks.all)
  return (
    <div>
      <Title value = {"Give a feedback!"} /> 
      <Button handleClick={handleclickgood} text="good" />
      <Button handleClick={handleclickneu} text="neutral" />
      <Button handleClick={handleclickbad} text="bad" />

      <Title value = {"Statistics"} /> 
      <Display name = {"good"} value = {clicks.good} />
      <Display name = {"netural"} value = {clicks.neutral} />
      <Display name = {"bad"} value = {clicks.bad} />
      <Display name = {"avergae"} value = {(clicks.good+clicks.bad*(-1))/clicks.all} />
      <Display name = {"positive"} value = {clicks.good/clicks.all*100+' %'} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

