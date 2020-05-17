import React from 'react'
import { useSelector } from 'react-redux'

const UserDetails = ({ userId }) => {
  const user = useSelector(state => {
    return state.users
      ? state.users.filter(user => user.id.toString() === userId)[0]
      :null
  })
  const loggedInUser = useSelector(state => state.user)

  if(!loggedInUser || !user) return null

  return (
    <div>
      <h2>{ user.name }</h2>
      <h3>Blogs</h3>
      <ul>
        { user.blogs.length > 0
          ? user.blogs.map(blog => {
            return (
              <li key={blog.id}>
                {blog.title}
              </li>
            )
          })
          : <div>no blogs were found for user</div>
        }
      </ul>
    </div>
  )
}

export default UserDetails
