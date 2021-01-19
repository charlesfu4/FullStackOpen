export const createAnecdote = (data) => {
  return{
    type: 'NEW_OBJ',
    data
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':{
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== changedAnecdote.id? anecdote:changedAnecdote)
    }
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_OBJ':
      return [...state, action.data] 
    default:
      return state
  }
}

export default reducer