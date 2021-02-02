import React from 'react'
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
      returnedState.error ?
        <div className='error' data-cy='error-noti'>
          {JSON.stringify(returnedState.notification)}
        </div>
        :
        <div className='note' data-cy='passed-noti'>
          {returnedState.notification}
        </div>
    )
  }

}

export default Notification