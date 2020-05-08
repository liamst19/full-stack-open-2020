import React, { useState, useEffect } from 'react'
import { getLocalStorageUser } from './services/login'
import BlogList from './components/BlogList'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const localStorageUser = getLocalStorageUser()
    if (localStorageUser) {
      setUser(localStorageUser)
    }
  }, [])

  return (
    <div>
      <Login user={ user } setUser={ setUser } />
      { user ? <BlogList user={ user } /> : null }
    </div>
  )
}

export default App
