
const initialState = {
  type: 'init',
  text: ''
}

const reducer = (state = initialState, action) => {
  const actionSwitch = {
    'NOTIFY_RESET': () =>  initialState,
    'NOTIFY_INFO': action => ({
      type: 'info',
      text: action.data.text,
      timeoutId: action.data.timeoutId
    }),
    'NOTIFY_ERROR': action => ({
      type: 'error',
      text: action.data.text,
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

export const setNotification = (text, timeout) => {
  return dispatch => {

    // reset notification after specified delay
    const timeoutId = setTimeout(() => dispatch(resetNotification()), timeout)

    dispatch({
      type: 'NOTIFY_INFO',
      data: {
        text,
        timeoutId
      }
    })
  }
}

export const notifyInfo = text => {
  return async dispatch => dispatch({
    type: 'NOTIFY_INFO',
    data: { text }
  })
}

export const notifyError = text => {
  return async dispatch => dispatch({
    type: 'NOTIFY_ERROR',
    data: { text }
  })
}

export const resetNotification = () => {
  return async dispatch => dispatch({
    type: 'NOTIFY_RESET'
  })
}

export default reducer
