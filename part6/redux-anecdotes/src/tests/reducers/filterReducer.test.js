import filterReducer from '../../reducers/filterReducer'

describe('filter reducer', () => {

  test('should return proper initial state (empty) when called with undefined state', () => {
    const state = ''
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = filterReducer(state, action)
    expect(newState).toEqual('')
  })

  test('should return filter text when called with filter change action', () => {
    const state = ''
    const action = {
      type: 'FILTER_CHANGE',
      data: { filter: 'test filter' }
    }

    const newState = filterReducer(state, action)
    expect(newState).toEqual('test filter')
  })

  test('reset action should return empty', () => {
    const state = 'original filter state'
    const action = {
      type: 'FILTER_RESET'
    }

    const newState = filterReducer(state, action)
    expect(newState).toEqual('')
  })

})
