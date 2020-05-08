
const mongoose = require('mongoose')
const config      = require('./utils/config')
const logger      = require('./utils/logger')

const Blog = require('./models/blog')
const User = require('./models/user')

const { getInitialBlogsWithUserId } = require('./tests/utils/test_helper_blogs.js')
const { initialUsers } = require('./tests/utils/test_helper_users.js')

logger.info(`Connecting to database ${config.MONGODB_URI} ...`)
mongoose
  .connect(
    config.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    logger.info('...Connected to database')
  })
  .catch(error => {
    logger.error('...Error connecting to database:', error.message)
  })

const doDBOp = async () => {
  try{
    await User.deleteMany({})
    console.log('cleared users')
    await Blog.deleteMany({})
    console.log('cleared blogs')

    const usersInDb = await User.insertMany(initialUsers)
    console.log('inserted users')
    const initialBlogs = getInitialBlogsWithUserId(usersInDb)
    console.log('prepared blogs')
    const blogsInDb = await Blog.insertMany(initialBlogs)
    console.log('inserted blogs')

    await Promise.all(usersInDb.map(user => user.update({
      blogs: blogsInDb.filter(blog => blog.user.toString() === user.id.toString()).map(blog => blog.id)
    })))
    console.log('updated users with blog ids')

    mongoose.connection.close()

  } catch(error){
    logger.error(error)
  }
}

doDBOp()
