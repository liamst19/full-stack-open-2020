import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    props.newAnecdote(content)
    props.setNotification(`anecdote was added: ${ content }`, 5000)
    // Reset form
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleSubmit }>
        <div><input type="text" name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  newAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
