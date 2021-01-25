const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_NOTI':
      return action.notification 
    case 'TIMEOUT_NOTI':
      return null 
    default:
      return state
  }
}
let timeoutId
export const addNotification = (content, second = 5) => {
  if(timeoutId !== null)
    clearTimeout(timeoutId)
  return async dispatch => {
    await dispatch({
      type: 'NEW_NOTI',
      notification: content
    })
    timeoutId = setTimeout(() => {
        return dispatch(timeoutNotificaiton(null))
    }, second*1000)
  }
}

export const timeoutNotificaiton = () => {
  return {
    type: 'TIMEOUT_NOTI',
  }
}

export default reducer