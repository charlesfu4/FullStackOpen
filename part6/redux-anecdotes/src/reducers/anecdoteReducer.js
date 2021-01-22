import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_OBJ',
      data: newAnecdote
    })
  } 
}

export const voteFor = (id) => {
  return async dispatch => {
    const currAnecdote = await anecdoteService.get(id)
    const updatedAnecdote = await anecdoteService.update(id, {
      ...currAnecdote,
      votes: currAnecdote.votes+1
    }) 
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
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