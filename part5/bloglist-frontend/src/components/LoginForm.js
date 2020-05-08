import React, { useState } from 'react'
import { login, setLocalStorageUser } from '../services/login'

const LoginForm = ({ setUser, notify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    const clearForm = () => {
      setUsername('')
      setPassword('')
    }
    event.preventDefault()
    try {
      console.log('logging in with', username, password)
      const user = await login(username, password)
      console.log('login response:', user)
      setLocalStorageUser(user)
      setUser(user)
      notify({type: 'info', text: `successfully logged in as ${ user.name }`})
      clearForm()
    } catch(e) {
      if(e.response && e.response.data && e.response.data.error){
        notify({type: 'error', text: e.response.data.error})
      }
      clearForm()
    }
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
