import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'

import { loginUser } from '../reducers/loginReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

  const username = useField('text')
  const password = useField('password')

  const clearForm = () => {
    username.reset()
    password.reset()
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const login = async (username, password) => {
      //login
      try {
        const user = await dispatch(loginUser(username, password))
        await dispatch(notifyInfo(`logged in as ${user.name}`))
        clearForm()
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    }
    login(username.value, password.value)
  }

  return (
    <div id="login-form" className="formDiv">
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ...username.attr } />
        </div>
        <div>
          password
          <input { ...password.attr } />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
