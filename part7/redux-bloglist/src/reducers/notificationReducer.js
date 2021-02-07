const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTI':
      return {
        notification: action.notification,
        error: action.error
      } 
    case 'TIMEOUT_NOTI':
      return null
    default:
      return state
  }
}

let timeoutId

export const addNotification = (content, error, second = 5) => {
  if(timeoutId !== null)
    clearTimeout(timeoutId)
  return async dispatch => {
    await dispatch({
      type: 'NEW_NOTI',
      notification: content,
      error: error 
    })
    timeoutId = setTimeout(() => {
       dispatch({
        type: 'TIMEOUT_NOTI'
      })
    }, second*1000)
  }
}

export default reducer