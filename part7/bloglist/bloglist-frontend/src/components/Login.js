import React from 'react'
import { useSelector } from 'react-redux'

// Components
import LoginForm from './LoginForm'

const Login = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      {
        !user
          ?  <LoginForm />
          : null
      }
    </div>
  )
}

export default Login
