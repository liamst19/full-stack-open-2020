import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const handleVote = anecdote => e => {
    e.preventDefault()
    dispatch(vote(anecdote.id))
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

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
        .filter(anecdote => anecdote.content.match(filter))

  return (
    <div>
      {anecdotes.map(
        anecdote => <Anecdote
                      key={anecdote.id}
                      anecdote={ anecdote }
                    />
      )}
    </div>
  )
}

export default AnecdoteList
