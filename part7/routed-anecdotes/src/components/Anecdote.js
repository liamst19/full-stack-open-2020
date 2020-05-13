import React from 'react'

const Anecdote = ({ anecdote }) => {

  if(!anecdote){
    return (
      <div>No anecdote was found for the given id</div>
    )
  }

  return (
    <div>
      <div className="content">
        <h3>{ anecdote.content }</h3>
      </div>
      <div className="auhor">
        by { anecdote.author }
      </div>
      <div className="likes">
        has {anecdote.votes} votes
      </div>
      <div className="url">
        for more info see <a href="{anecdote.info}">{anecdote.info}</a>
      </div>
    </div>
  )
}

export default Anecdote
