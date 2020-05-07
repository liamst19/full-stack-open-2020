const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const userPopulateObj = { path: 'user', select: '-passwordHash -blogs' }


blogRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate(userPopulateObj)

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  // get token
  const decodedToken = request.token
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  // get user
  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(401).json({
      error: 'user was not found'
    })
  }

  // Save blog to db
  const newBlog = await (new Blog({...request.body, user: user.id})).save()

  await User.findOneAndUpdate(user.id, { blogs: user.blogs.concat(newBlog.id) })
  return response.status(201).json(newBlog)
})

// ----------------------------------------

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  const blog = await Blog.findById(id).populate(userPopulateObj)
  if(blog){
    return response.json(blog)
  } else {
    return response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  // get token
  const decodedToken = request.token
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = await Blog.findById(id)
  if(!blog){
    return response.status(404).end()
  }
  if(blog.user.toString() !== user.id.toString()){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blogUpdateData = { ...request.body }

  await blog.update(blogUpdateData)
  return response.status(200).end()
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  if(!id) return response.status(400).json({ error: 'no id' })

  // get token
  const decodedToken = request.token
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  // get user
  const user = await User.findById(decodedToken.id)
  if(!user){
    return response.status(401).json({
      error: 'user was not found'
    })
  }
  const blog = await Blog.findById(id)

  if(!blog){
    return response.status(404).end()
  }
  if(blog.user.toString() !== user.id.toString()){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const ret = await blog.remove()

  await User.findOneAndUpdate(user.id, { blogs: user.blogs.filter(blog => blog.id.toString() !== id) })

  if(ret){
    return response.status(204).end()
  } else {
    return response.status(404).end()
  }
})

module.exports = blogRouter
