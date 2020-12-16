import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => <h1>{props.value}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({name, value}) => <div>{name}: {value}</div>
const Display = (props) => <div>{props.text}</div>

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
  if(clicks.all === 0){
    return(
      <div>
      <Title value = {"Give a feedback!"} /> 
      <Button handleClick={handleclickgood} text="good" />
      <Button handleClick={handleclickneu} text="neutral" />
      <Button handleClick={handleclickbad} text="bad" />

      <Title value = {"Statistics"} />  
      <Display text={"No feedback given."} />
      </div>
    )
  }
  else{
    return (
      <div>
        <Title value = {"Give a feedback!"} /> 
        <Button handleClick={handleclickgood} text="good" />
        <Button handleClick={handleclickneu} text="neutral" />
        <Button handleClick={handleclickbad} text="bad" />

        <Title value = {"Statistics"} /> 
        <Statistics name = {"good"} value = {clicks.good} />
        <Statistics name = {"netural"} value = {clicks.neutral} />
        <Statistics name = {"bad"} value = {clicks.bad} />
        <Statistics name = {"avergae"} value = {(clicks.good+clicks.bad*(-1))/clicks.all} />
        <Statistics name = {"positive"} value = {clicks.good/clicks.all*100+' %'} />
      </div>
    )
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

