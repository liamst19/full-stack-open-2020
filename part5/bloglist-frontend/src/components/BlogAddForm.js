import React, { useState } from 'react'

const BlogAddForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreate = e => {
    e.preventDefault()
    addBlog({ title, author, url })
    clearForm()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleCreate }>
        <div>
          title
          <input
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
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

export default BlogAddForm
