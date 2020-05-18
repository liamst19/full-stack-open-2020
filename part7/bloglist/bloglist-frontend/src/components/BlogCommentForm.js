import React from 'react'
import { useField } from '../hooks'
import { Form, Row, Col, Button } from 'react-bootstrap'

const BlogCommentForm = ({ handleCommentAdd }) => {
  const comment = useField('text')

  const onCommentSubmit = e => {
    e.preventDefault()
    const newComment = comment.value
    handleCommentAdd(newComment)
    comment.reset()
  }

  return (
    <Form onSubmit={ onCommentSubmit }>
      <Form.Group  as={Row}>
        <Col sm="5">
          <Form.Control { ...comment.attr } />
        </Col>
        <Button variant="primary" type="submit">add comment</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogCommentForm
