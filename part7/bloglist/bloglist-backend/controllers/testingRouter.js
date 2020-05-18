const router = require('express').Router()

const logger = require('../utils/logger')

// Models
const User = require('../models/user')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

// Testing Helpers
const { getInitialBlogsWithUserId } = require('../tests/utils/test_helper_blogs.js')
const { initialUsers } = require('../tests/utils/test_helper_users.js')
const { sampleComments } = require('../tests/utils/test_helper_comments.js')

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

  const blogWithComments = blogsInDb[0]
  const commentsInDb = await Comment.insertMany(sampleComments.map(c => ({ ...c, blogId: blogWithComments.id })))
  logger.info('...inserted comments to db')

  await blogWithComments.update({ comments: commentsInDb.map(c => c.id) })
  logger.info('...updated blog with comment ids')

  await Promise.all(usersInDb.map(user => user.update({
    blogs: blogsInDb.filter(blog => blog.user.toString() === user.id.toString()).map(blog => blog.id)
  })))
  logger.info('...updated users')

  logger.info('data was successfully seeded')
  response.status(201).end()
})

module.exports = router
