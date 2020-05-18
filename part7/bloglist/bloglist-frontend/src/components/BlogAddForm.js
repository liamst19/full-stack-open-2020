import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { useField } from '../hooks'

const BlogAddForm = ({ addBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const clearForm = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const handleSubmit = e => {
    e.preventDefault()
    addBlog({ title, author, url })
    clearForm()
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <Form onSubmit={ handleSubmit }>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control {...title.attr} />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control {...author.attr} />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control {...url.attr} />
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
BlogAddForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogAddForm
