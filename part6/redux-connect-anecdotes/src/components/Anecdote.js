import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = (props) => {

  const handleVote = anecdote => e => {
    e.preventDefault()
    props.voteAnecdote(anecdote)
    props.setNotification(`liked ${ anecdote.content }`, 1000)
  }

  return (
    <div>
      <div>
        {props.anecdote.content}
      </div>
      <div>
        has {props.anecdote.votes}
        <button onClick={ handleVote(props.anecdote) }>vote</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}
const ConnectedAnecdote = connect(
  null,
  mapDispatchToProps
)(Anecdote)

export default ConnectedAnecdote
