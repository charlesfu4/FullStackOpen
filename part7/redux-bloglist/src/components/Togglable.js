import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
          {props.succintInfo} <Button variant="primary" onClick={toggleVisibility}>{props.backButton}</Button>
          {props.children}
        </div> :
        <div style={showWhenVisible}>
          {props.children} <Button variant="primary" onClick={toggleVisibility}>{props.backButton}</Button>
        </div>
    )
  }

  return (
    <div className='togglableContent'>
      <div style={hideWhenVisible} >
        {props.succintInfo} <Button variant="primary" onClick={toggleVisibility}>{props.forwardButton}</Button>
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