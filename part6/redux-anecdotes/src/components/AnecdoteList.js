import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              props.voteFor(anecdote.id) 
              props.addNotification(`you voted ${anecdote.content}`, 5)
              }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const sorted = state.anecdotes.sort((a,b) => b.votes - a.votes)
  const filter = state.filter
  return {
    anecdotes:sorted.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
} 

const mapDispatchToProps = {
  voteFor,
  addNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
