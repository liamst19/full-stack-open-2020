import anecdoteReducer, { initialState } from '../../reducers/anecdoteReducer'


describe('anecdote reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const state = initialState
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('should increment vote when VOTE action is called', () => {
    const anecdote = initialState[0]

    const action = {
      type: 'VOTE',
      id: anecdote.id
    }

    const newState = anecdoteReducer(initialState, action)

    expect(newState.filter(a => a.id === anecdote.id)[0].votes).toBe(anecdote.votes + 1)

  })


})
