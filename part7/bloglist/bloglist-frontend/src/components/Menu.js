import React from 'react'
import { Link } from 'react-router-dom'

import LoggedIn from './LoggedIn'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className="menu">
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
      <LoggedIn  />
    </div>
  )
}

export default Menu
