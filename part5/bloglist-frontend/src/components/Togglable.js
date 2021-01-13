import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      <div style={hideWhenVisible} className='togglableContentDefault'>
        {props.succintInfo} <button onClick={toggleVisibility}>{props.forwardButton}</button>
      </div>
      {fullVisibility()}
    </div>
  )
})

Togglable.propTypes = {
  backButton: PropTypes.string.isRequired,
  forwardButton: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable