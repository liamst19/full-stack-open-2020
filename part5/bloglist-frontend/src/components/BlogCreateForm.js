import React, { useState } from 'react'

import { createBlog } from '../services/blogs'

const BlogCreateForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

  const clearForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreate = async e => {
    e.preventDefault()

    try{
      const newBlog =  await createBlog({ title, author, url })
      console.log('create response', newBlog)
      if(newBlog
         && !Object.prototype.hasOwnProperty.call(newBlog, 'error')){
        setBlogs([...blogs, newBlog])
        clearForm()
      } else {
        console.log('errors from server:',
                    newBlog ? newBlog.error : 'none')
      }
    } catch(e){
      console.log('error', e)
    }
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

export default BlogCreateForm
