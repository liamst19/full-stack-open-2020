import React from 'react'
import { connect } from 'react-redux'

import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
  const filter = props.filter
  const anecdotesToShow = props.anecdotes
        .filter(anecdote => anecdote.content.match(filter))

  return (
    <div>
      {anecdotesToShow.map(
        anecdote => <Anecdote
                      key={anecdote.id}
                      anecdote={ anecdote }
                    />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}
const ConnectedAnecdoteList = connect(
mapStateToProps
)(AnecdoteList)


export default ConnectedAnecdoteList
