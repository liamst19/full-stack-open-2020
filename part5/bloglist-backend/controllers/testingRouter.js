const router = require('express').Router()

const logger = require('../utils/logger')

// Models
const User = require('../models/user')
const Blog = require('../models/blog')

// Testing Helpers
const { getInitialBlogsWithUserId } = require('../tests/utils/test_helper_blogs.js')
const { initialUsers } = require('../tests/utils/test_helper_users.js')

router.post('/reset', async (request, response) => {
  console.log('reset')
  logger.info('resetting data..')
  await Blog.deleteMany({})
  logger.info('...deleted blogs')
  await User.deleteMany({})
  logger.info('...deleted users')
  logger.info('data was successfully reset')
  response.status(204).end()
})

router.post('/seed', async (request, response) => {
  logger.info('seeding data..')

  const usersInDb = await User.insertMany(initialUsers)
  logger.info('...added users to db')
  const initialBlogs = getInitialBlogsWithUserId(usersInDb)
  const blogsInDb = await Blog.insertMany(initialBlogs)
  logger.info('...inserted blogs to db')

  await Promise.all(usersInDb.map(user => user.update({
    blogs: blogsInDb.filter(blog => blog.user.toString() === user.id.toString()).map(blog => blog.id)
  })))
  logger.info('...updated users')
  logger.info('data was successfully seeded')
  response.status(201).end()
})

module.exports = router
