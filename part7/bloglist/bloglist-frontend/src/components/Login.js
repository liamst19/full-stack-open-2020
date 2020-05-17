import React from 'react'
import { useSelector } from 'react-redux'

// Components
import LoginForm from './LoginForm'

const Login = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      {
        user
          ? <div>{`${ user.name } logged in `}</div>
          : <LoginForm />
      }
    </div>
  )
}

export default Login
