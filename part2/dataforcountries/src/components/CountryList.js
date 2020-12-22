import React from 'react'
const CountryList = (props) => {

  const setFilter = props.setFilter
  const handleButtonPress = (event) => {
    console.log(props.name)
    setFilter(props.name)
  }

  console.log(props.name)
  return(<div>{props.name}
    <button onClick={handleButtonPress}>show</button>
    </div>
  )
}


export default CountryList