import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    const sorted = anecdotes.sort((a, b) => b.votes - a.votes)
    return  sorted.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = ({id, content}) => {
    dispatch(voteFor(id))
    dispatch (addNotification(`you voted ${content}`, 5))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
