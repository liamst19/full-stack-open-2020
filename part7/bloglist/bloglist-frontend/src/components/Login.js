import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logoutUser } from '../reducers/loginReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

// Components
import LoginForm from './LoginForm'

const LoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogoutBtn = e => {
    e.preventDefault()
    const logout = async () => {
      try{
        await dispatch(logoutUser())
        await dispatch(notifyInfo('successfully logged out'))
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    }
    logout()
  }
  return (
    <div id="logged-in-user">
      {`${ user.name } logged in `}
      <button onClick={handleLogoutBtn}>log out</button>
    </div>
  )
}

const Login = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      {
        user
          ? <LoggedIn  />
          : <LoginForm />
      }
    </div>
  )
}

export default Login
