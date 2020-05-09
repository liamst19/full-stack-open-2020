import React, { useState } from 'react'
import loginService from '../services/login'

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
        notify({type: 'info', text: `successfully logged in as ${ user.name }`})
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          notify({type: 'error', text: e.response.data.error})
        }
      }
    }
    loginUser()
    clearForm()
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
