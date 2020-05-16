

const reducer = (state = '', action) => {
  const actionSwitch = {
    'FILTER_RESET': () => '',
    'FILTER_CHANGE': action => action.data.filter
  }
  return Object.prototype.hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
    : state
}

export const filterReset = () => {
  return {
    type: 'FILTER_RESET'
  }
}

export const filterChange = filter => {
  return {
    type: 'FILTER_CHANGE',
    data: { filter }
  }
}

export default reducer
