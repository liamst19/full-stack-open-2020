const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const newBlog = await (new Blog(request.body)).save()
  response.status(201).json(newBlog)
})

// ----------------------------------------

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  const blog = await Blog.findById(id)
  if(blog){
    return response.json(blog)
  } else {
    return response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  const blogUpdateData = { ...request.body }

  const retBlog = await Blog.findByIdAndUpdate(id, blogUpdateData, { new: true })

  if(retBlog){
    return response.json(retBlog)
  } else {
    return response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  const ret = await Blog.findByIdAndRemove(id)

  if(ret){
    return response.status(204).end()
  } else {
    return response.status(404).end()
  }
})

module.exports = blogRouter
