const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTI':
      return action.notification 
    case 'VOTE_NOTI':
      return action.notification 
    case 'TIMEOUT_NOTI':
      return null 
    default:
      return state
  }
}

export const addNotification = (content) => {
  return {
    type: 'NEW_NOTI',
    notification: `'${content}' is added`
  }
}

export const voteNotification = (content) => {
  return {
    type: 'VOTE_NOTI',
    notification: `you voted to '${content}'`
  }
}

export const timeoutNotificaiton = () => {
  return {
    type: 'TIMEOUT_NOTI',
  }
}

export default reducer