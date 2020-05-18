const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  if(!blogId) return response.status(400).json({ error: 'no id' })
  const blog = await Blog.findById(blogId)
  if(!blog){
    return response.status(404).end()
  }

  const comments = await Comment.find({ blogId })

  // Return comments or empty if none were found
  return response.json(comments || [])
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  if(!blogId)
    return response.status(400).json({ error: 'no id' })
  else if(!request.body || !request.body.comment)
    return response.status(400).json({error: 'empty comment'})

  const blog = await Blog.findById(blogId)
  if(!blog){
    return response.status(404).end()
  }

  const newComment = await (new Comment({...request.body, blogId})).save()

  await blog.update({ comments: blog.comments.concat(newComment.id) })

  return response.status(201).json(newComment)
})

module.exports = commentsRouter
