
const initialState = {
  type: 'init',
  text: ''
}

const reducer = (state = initialState, action) => {
  const actionSwitch = {
    'NOTIFY_RESET': () =>  initialState,
    'NOTIFY_INFO': action => ({
      type: 'info',
      message: action.data.message,
      timeoutId: action.data.timeoutId
    }),
    'NOTIFY_ERROR': action => ({
      type: 'error',
      message: action.data.message,
      timeoutId: action.data.timeoutId
    })
  }

  if(Object.prototype.hasOwnProperty.call(actionSwitch, action.type)){
    // Cancel previous reset timeout
    if(state.timeoutId) window.clearTimeout(state.timeoutId)
    return actionSwitch[action.type](action)
  } else {
    return state
  }
}

const TIMEOUT_DEFAULT = 3000

export const setNotification = (message, timeout) => {
  return dispatch => {

    // reset notification after specified delay
    const timeoutId = setTimeout(() => dispatch(resetNotification()), timeout)

    dispatch({
      type: 'NOTIFY_INFO',
      data: {
        message,
        timeoutId
      }
    })
  }
}

export const notifyInfo = (message, timeout = TIMEOUT_DEFAULT) =>  async dispatch => {
  // reset notification after specified delay
  const timeoutId = setTimeout(() => dispatch(resetNotification()), timeout)

  dispatch({
    type: 'NOTIFY_INFO',
    data: { message, timeoutId }
  })
}

export const notifyError = (message, timeout = TIMEOUT_DEFAULT) =>  async dispatch => {
  // reset notification after specified delay
  const timeoutId = setTimeout(() => dispatch(resetNotification()), timeout)

  dispatch({
    type: 'NOTIFY_ERROR',
    data: { message, timeoutId }
  })
}

export const resetNotification = () =>  async dispatch => dispatch({
  type: 'NOTIFY_RESET'
})

export default reducer
