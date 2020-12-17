import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = (props) => <h1>{props.value}</h1>
const Statistic = ({name, value}) => <div>{name}: {value}</div>
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  console.log(props.all)
  if(props.all === 0){
    return(
      <div>
      <Display text={"No feedback given."} />
      </div>
    )
  }
  else{
    return(
      <div>
      <Statistic name = {"good"} value = {props.good} />
      <Statistic name = {"netural"} value = {props.neutral} />
      <Statistic name = {"bad"} value = {props.bad} />
      <Statistic name = {"avergae"} value = {(props.good+props.bad*(-1))/props.all} />
      <Statistic name = {"positive"} value = {props.good/props.all*100+' %'} />
      </div>
    )
  }
}
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
    return(
      <div>
      <Title value = {"Give a feedback!"} /> 
      <Button handleClick={handleclickgood} text="good" />
      <Button handleClick={handleclickneu} text="neutral" />
      <Button handleClick={handleclickbad} text="bad" />

      <Title value = {"Statistics"} />  
      <Statistics 
      all={clicks.all} 
      good={clicks.good}
      neutral={clicks.neutral} 
      bad={clicks.bad} />
      </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

