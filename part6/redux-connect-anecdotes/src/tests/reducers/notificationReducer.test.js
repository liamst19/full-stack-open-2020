import notificationReducer from '../../reducers/notificationReducer'

describe('notification reducer', () => {

  test('should return proper initial state (empty) when called with undefined state', () => {
    const state = ''
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual('')
  })

  test('should return info notification when called with info action', () => {
    const state = ''
    const action = {
      type: 'NOTIFY_INFO',
      data: { text: 'test info notification text' }
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual({
      type: 'info',
      text: 'test info notification text'
    })
  })

  test('should return error notification when called with error action', () => {
    const state = ''
    const action = {
      type: 'NOTIFY_ERROR',
      data: { text: 'test error notification text' }
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual({
      type: 'error',
      text: 'test error notification text'
    })
  })
})
