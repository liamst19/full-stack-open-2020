import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogAddForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    addBlog({ title, author, url })
    clearForm()
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          title:&nbsp;
          <input
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:&nbsp;
          <input
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:&nbsp;
          <input
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  )
}
BlogAddForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogAddForm
