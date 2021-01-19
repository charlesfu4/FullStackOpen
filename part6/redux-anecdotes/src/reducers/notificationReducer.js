const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTI':
      return action.notification 
    case 'VOTE_NOTI':
      return action.notification 
    case 'TIMEOUT_NOTI':
      return action.notification
    default:
      return state
  }
}

export const addNotification = (notification) => {
  return {
    type: 'NEW_NOTI',
    notification: `'${notification}' is added`
  }
}

export const voteNotification = (notification) => {
  return {
    type: 'VOTE_NOTI',
    notification: `you voted to '${notification}'`
  }
}

export const timeoutNotificaiton = () => {
  return {
    type: 'TIMEOUT_NOTI',
    notification: null
  }
}

export default reducer