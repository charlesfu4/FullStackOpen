import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else if(message.error){
    return (
      <div className='error'>
        {JSON.stringify(message.content)}
      </div>
    )
  }
  else{
    return (
      <div className='note'>
        {message.content}
      </div>
    )
  }
}

export default Notification