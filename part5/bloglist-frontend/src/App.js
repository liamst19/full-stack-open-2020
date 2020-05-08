import React, { useState, useEffect } from 'react'
import { getLocalStorageUser, removeLocalStorageUser } from './services/login'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  useEffect(() => {
    const localStorageUser = getLocalStorageUser()
    if (localStorageUser) {
      setUser(localStorageUser)
    }
  }, [])

  const notify = message => {
    setMessage(message.text)
    setMessageType(message.type)

    const timeout = 5000
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, timeout)
  }

  return (
    <div>
      <Notification message={ message } messageType={ messageType } />
      <Login user={ user } setUser={ setUser } notify={ notify } />
      { user ? <BlogList user={ user } notify={ notify } /> : null }
    </div>
  )
}

export default App
