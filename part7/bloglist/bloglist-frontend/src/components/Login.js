import React from 'react'
import PropTypes from 'prop-types'

// Services
import loginService from '../services/loginService'
// Components
import LoginForm from './LoginForm'

const LoggedIn = ({ user, setUser, notify }) => {
  const handleLogoutBtn = e => {
    e.preventDefault()
    loginService.removeLocalStorageUser()
    setUser(null)
    notify({ type: 'info', text: 'you have logged out' })
  }
  return (
    <div id="logged-in-user">
      {`${ user.name } logged in `}
      <button onClick={handleLogoutBtn}>log out</button>
    </div>
  )
}

LoggedIn.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

const Login = ({ user, setUser, notify }) => {
  return (
    <div>
      { user ? <LoggedIn user={ user } setUser={ setUser } notify={ notify } />
        : <LoginForm setUser={ setUser } notify={ notify } />}
    </div>
  )
}

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default Login
