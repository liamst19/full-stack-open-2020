import React from 'react'
import { useSelector } from 'react-redux'

import Anecdote from './Anecdote'

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
