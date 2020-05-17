import loginService from '../services/loginService'

const reducer = (state = null, action) => {
  const actionSwitch = {
    'USER_INIT': action => action.user,
    'USER_LOGIN': action => action.user,
    'USER_LOGOUT': () => null
  }
  return Object.prototype.hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
    : state
}

// ----------------------------------------

export const initUser = () => async dispatch => {
  const user = loginService.getLocalStorageUser()
  if(user){
    dispatch({
      type: 'USER_INIT',
      user
    })
  }
}

export const loginUser = (username, password) => async dispatch => {
  const user = await loginService.login(username, password)
  if(user){
    loginService.setLocalStorageUser(user)
    dispatch({
      type: 'USER_LOGIN',
      user
    })
  }
  return user
}

export const logoutUser = () => async dispatch => {
  loginService.removeLocalStorageUser()
  dispatch({
    type: 'USER_LOGOUT'
  })
}

export default reducer
