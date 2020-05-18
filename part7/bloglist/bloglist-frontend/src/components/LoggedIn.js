import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

import { logoutUser } from '../reducers/loginReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

const LoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if(!user) return null

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
    <span id="logged-in-user">
      {`${ user.name } logged in `}
      <Button size="sm" variant="outline-primary" onClick={handleLogoutBtn}>
        log out
      </Button>
    </span>
  )
}

export default LoggedIn
