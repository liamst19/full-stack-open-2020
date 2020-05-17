import React from 'react'
import { useSelector } from 'react-redux'

// Actions
// import {
//   removeUser
// } from '../reducers/userReducer'
// import {
//   notifyInfo,
//   notifyError
// } from '../reducers/notificationReducer'

// Components
import User from './User'

// ----------------------------------------
const UserList = () => {
  const users = useSelector(state => state.users)
  const loggedInUser = useSelector(state => state.user)

  if(!loggedInUser) return null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user => <User key={user.id} user={user} />) }
        </tbody>
      </table>
    </div>
  )
}

export default UserList
