const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter 
    default:
      return state
  }
}

export const defineFilter = (content) => {
  return{
    type: 'SET_FILTER',
    filter: content
  }
}


export default reducer