import React, { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/loginService'

const LoginForm = ({ setUser, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const clearForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const loginUser = async () => {
      try {
        const user = await loginService.login(username, password)
        loginService.setLocalStorageUser(user)
        setUser(user)
        notify({ type: 'info', text: `successfully logged in as ${ user.name }` })
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          notify({ type: 'error', text: e.response.data.error })
        }
      }
    }
    loginUser()
    clearForm()
  }

  return (
    <div id="login-form" className="formDiv">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default LoginForm
