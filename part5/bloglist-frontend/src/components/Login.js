import React from 'react'

// Services
import loginService from '../services/login'
// Components
import LoginForm from './LoginForm'

const LoggedIn = ({ user, setUser, notify }) => {
  const handleLogoutBtn = e => {
    e.preventDefault()
    loginService.removeLocalStorageUser()
    setUser(null)
    notify({type: 'info', text: 'you have logged out'})
  }
  return (
    <div>
      {`${ user.name } logged in `}
      <button onClick={handleLogoutBtn}>log out</button>
    </div>
  )
}

const Login = ({ user, setUser, notify }) => {
  return (
    <div>
      { user ? <LoggedIn user={ user } setUser={ setUser } notify={ notify } />
        : <LoginForm setUser={ setUser } notify={ notify } />}
    </div>
  )
}

export default Login
