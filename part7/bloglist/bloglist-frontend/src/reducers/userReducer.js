import userService from '../services/userService'

const reducer = (state = [], action) => {
  const actionSwitch = {
    'USERS_INIT': action => action.data,
    'USERS_CREATE': action => state.concat(action.data),
    'USERS_UPDATE': action => state.map(user => user.id === action.data.id ? { ...user, ...action.data.userData } : user),
    'USERS_REMOVE': action => state.filter(user => user.id !== action.data.id)
  }
  return Object.prototype.hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
    : state
}

// ----------------------------------------

export const getAllUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch({
    type: 'USERS_INIT',
    data: users
  })
}

export const createUser = user => async dispatch => {
  const newUser = await userService.createUser(user)
  dispatch({
    type: 'USERS_CREATE',
    data: newUser
  })
  return newUser
}

export const updateUser = (id, userData) => async dispatch => {
  await userService.updateUser(id, userData)
  dispatch({
    type: 'USERS_UPDATE',
    data: { id, userData }
  })
}

export const removeUser = id => async dispatch => {
  await userService.removeUser(id)
  dispatch({
    type: 'USERS_REMOVE',
    data: { id }
  })
}

export default reducer
