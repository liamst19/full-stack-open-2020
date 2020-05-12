const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {

  const actionSwitch = {
    'ANECDOTE_INIT': action => action.data,
    'ANECDOTE_VOTE': action => state.map(anecdote => anecdote.id === action.data.id
                                         ? {...anecdote, votes: anecdote.votes + 1 }
                                         : anecdote),
    'ANECDOTE_NEW' : action => [...state, asObject(action.data.content)]
  }

  return (Object.prototype.hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
          : state)
    .sort((a,b) => b.votes - a.votes)
}

// Action Creators

export const voteAnecdote = id => {
  return {
    type: 'ANECDOTE_VOTE',
    data: { id }
  }
}

export const newAnecdote = content => {
  return {
    type: 'ANECDOTE_NEW',
    data: { content }
  }
}

export const initializeAnecdotes = data => {
  return {
    type: 'ANECDOTE_INIT',
    data
  }
}

export default reducer
