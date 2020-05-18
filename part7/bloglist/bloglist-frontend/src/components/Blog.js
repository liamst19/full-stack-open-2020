import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  if(!blog) return null
  return (
    <tr className='blogEntry'>
      <td>
        <Link to={`/blog/${ blog.id }`}>
          {`${blog.title} by ${blog.author} `}
        </Link>
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
