import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          { user.blogs.length > 0
            ? user.blogs.map(blog => {
              return (
                <tr key={blog.id}>
                  <td>
                    {blog.title}
                  </td>
                </tr>
              )
            })
            : (
              <tr>
                <td>
                  no blogs were found for user
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  )
}

export default UserDetails
