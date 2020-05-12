import React from 'react'
import { useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const handleVote = anecdote => e => {
    e.preventDefault()
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`liked ${ anecdote.content }`, 5000))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={ handleVote(anecdote) }>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
