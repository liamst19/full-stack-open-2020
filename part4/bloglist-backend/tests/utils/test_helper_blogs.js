const Blog = require('../../models/blog')

const sampleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }]

const initialBlogs = sampleBlogs.map(blog => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes
}))

const getRandomIdx = max => Math.floor(Math.random() * Math.floor(max))

const getInitialBlogsWithUserId = users => sampleBlogs.map(blog => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes,
  user: users[getRandomIdx(users.length)].id
}))

const sampleNewBlog = {
  title: 'New Blog Title',
  author: 'Newt Blogger',
  url: 'http://www.twitter.com',
  likes: 4
}

const getNonExistingId = async userid => {
  const blog = new Blog({
    title: 'Will Remove',
    author: 'Will Remover',
    url: 'http://willremove.org/',
    likes: 0,
    user: userid
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const getBlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  sampleBlogs, initialBlogs,
  sampleNewBlog,
  getInitialBlogsWithUserId,
  getBlogsInDb,
  getNonExistingId
}
