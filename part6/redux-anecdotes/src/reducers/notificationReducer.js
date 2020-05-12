
const initialState = {
  type: 'init',
  text: ''
}

const reducer = (state = initialState, action) => {
  const actionSwitch = {
    'NOTIFY_RESET': () => initialState,
    'NOTIFY_INFO': action => ({ type: 'info', text: action.data.text }),
    'NOTIFY_ERROR': action => ({ type: 'error', text: action.data.text })
  }
  return Object.prototype.hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
    : state
}

export const notifyInfo = text => {
  return {
    type: 'NOTIFY_INFO',
    data: { text }
  }
}

export const notifyError = text => {
  return {
    type: 'NOTIFY_ERROR',
    data: { text }
  }
}

export const resetNotification = () => {
  return {
    type: 'NOTIFY_RESET'
  }
}

export default reducer
