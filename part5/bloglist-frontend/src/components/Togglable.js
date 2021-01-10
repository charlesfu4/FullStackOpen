import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    } 
  })

  const fullVisibility = () => {
    return(
      props.succintInfo !== undefined ?
        <div style={showWhenVisible}>
          {props.succintInfo} <button onClick={toggleVisibility}>{props.backButton}</button>
          {props.children} 
        </div> :
        <div style={showWhenVisible}>
          {props.children} <button onClick={toggleVisibility}>{props.backButton}</button>
        </div>
    )
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {props.succintInfo} <button onClick={toggleVisibility}>{props.forwardButton}</button>
      </div>
      {fullVisibility()}
    </div>
  )
})

export default Togglable