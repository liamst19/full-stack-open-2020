import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
  if(!blog) return null
  return (
    <div className='blogEntry'>
      <Link to={`/blog/${ blog.id }`}>
        {`${blog.title} by ${blog.author} `}
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
