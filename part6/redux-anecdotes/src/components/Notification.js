import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    background: 'rgb(255,255,0)',
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    fontFamily: "Arial"
  }
  
  const notification = useSelector(state => {
    return state.notification ? 
    <div style={style}>
      {state.notification}
    </div>
    :null
  })

  return (
    <div>
      {notification}  
    </div>
  )
}

export default Notification