import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const returnedState = useSelector(state => {
    return state.notiErr ?
      state.notiErr
      : null
  })

  if(!returnedState){
    return (
      <div>
        {returnedState}
      </div>
    )
  }
  else{
    return (
      <div data-cy='noti'>
        {returnedState.error ?
          <Alert variant="danger">
            {JSON.stringify(returnedState.notification)}
          </Alert>
          :
          <Alert variant="success">
            {returnedState.notification}
          </Alert>
        }
      </div>
    )
  }

}

export default Notification