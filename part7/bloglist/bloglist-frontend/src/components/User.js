import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const User = ({ user }) => {

  return(
    <tr>
      <td><Link to={`/user/${ user.id }`}>{ user.name }</Link></td>
      <td>{ user.blogs.length }</td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

export default User
