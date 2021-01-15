import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if(message.error){
    return (
      <div className='error' data-cy='error-noti'>
        {JSON.stringify(message.content)}
      </div>
    )
  }
  else{
    return (
      <div className='note' data-cy='passed-noti'>
        {message.content}
      </div>
    )
  }
}

export default Notification