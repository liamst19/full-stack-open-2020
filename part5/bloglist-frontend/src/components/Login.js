import React from 'react'
import LoginForm from './LoginForm'
import { removeLocalStorageUser } from '../services/login'

const LoggedIn = ({ user, setUser }) => {
  const handleLogoutBtn = e => {
    e.preventDefault()
    removeLocalStorageUser()
    setUser(null)
  }
  return (
    <div>
      {`${ user.name } logged in `}
      <button onClick={handleLogoutBtn}>log out</button>
    </div>
  )
}

const Login = ({ user, setUser }) => {
  return (
    <div>
      { user ? <LoggedIn user={ user } setUser={ setUser } />
        : <LoginForm setUser={ setUser } />}
    </div>
  )
}

export default Login
