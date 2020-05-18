const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')

const {
  getBlogsInDb,
  getInitialBlogsWithUserId,
  getNonExistingId
} = require('./utils/test_helper_blogs')
const { initialUsers } = require('./utils/test_helper_users')
const { sampleComments, sampleNewComment } = require('./utils/test_helper_comments')

const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

const API_PATH = '/api/blogs'

let usersInDb = []
let initialBlogs = []
let blogWithComments = null

beforeAll(async () => {
  await User.deleteMany({})
  usersInDb = await User.insertMany(initialUsers)
  initialBlogs = getInitialBlogsWithUserId(usersInDb)
})

beforeEach(async () => {
  await Comment.deleteMany({})
  await Blog.deleteMany({})
  if(!initialBlogs || initialBlogs.length < 1){
    throw 'initial blogs are empty'
  }
  const blogs = await Blog.insertMany(initialBlogs)
  blogWithComments = blogs[0]
  const newComments = sampleComments.map(comment => {
    return {
      ...comment,
      blogId: blogWithComments.id
    }
  })
  const insertedComments = await Comment.insertMany(newComments)
  await Blog.findByIdAndUpdate(blogWithComments.id, { comments: insertedComments.map(comment => comment.id) })
})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close()
})

describe('getting comments', () => {

  test('successful with valid blog id returns comments', async () => {
    const url = API_PATH + '/' + blogWithComments.id + '/comments'
    console.log(url)
    await api.get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('valid id for blog returns comments', async () => {
    const url = API_PATH + '/' + blogWithComments.id + '/comments'
    const response = await api.get(url)

    expect(response.body.length).toBe(sampleComments.length)
    expect(response.body.map(c => c.comment)).toEqual(sampleComments.map(c => c.comment))
  })

  test('returns 404 with invalid blog id', async () => {
    const invalidBlogId = await getNonExistingId(initialBlogs[0].user)
    const url = API_PATH + '/' + invalidBlogId + '/comments'
    await api.get(url)
      .expect(404)
  })

  test('returns empty with valid blog entry but without comments', async () => {
    const blogs = await getBlogsInDb()
    const ncBlogId = blogs.filter(blog => blog.user.toString() !== blogWithComments.user.toString())[0].id
    const url = API_PATH + '/' + ncBlogId + '/comments'
    const response = await api.get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual([])
  })

})

describe('posting comments', () => {

  test('success with valid comment and id', async () => {
    const blogId = blogWithComments.id
    const url = API_PATH + '/' + blogId + '/comments'
    const response = await api
      .post(url)
      .send({...sampleNewComment, blogId})
      .expect(201)

    expect(response.body.id).toBeDefined()
  })

  test('success adds one to comments collection', async () => {
    const blogId = blogWithComments.id
    const url = API_PATH + '/' + blogId + '/comments'
    await api
      .post(url)
      .send({...sampleNewComment, blogId})

    const comments = await Comment.find({})
    expect(comments.length).toBe(sampleComments.length + 1)
    expect(comments.map(c => c.comment)).toContain(sampleNewComment.comment)
  })

  test('success updates blog comments array', async () => {
    const blogId = blogWithComments.id
    const url = API_PATH + '/' + blogId + '/comments'
    const response = await api
      .post(url)
      .send({...sampleNewComment, blogId})
      .expect(201)

    const blog = await Blog.findById(blogId)
    expect(blog.comments.length).toEqual(sampleComments.length + 1)
    expect(blog.comments.map(c => c.toString())).toContainEqual(response.body.id)
  })

  test('fail with 404 using invalid blog id', async () => {
    const invalidBlogId = await getNonExistingId(initialBlogs[0].user)
    const url = API_PATH + '/' + invalidBlogId + '/comments'
    await api
      .post(url)
      .send({...sampleNewComment, invalidBlogId})
      .expect(404)
  })

  test('fail with 400 if no comment was sent', async () => {
    const blogId = blogWithComments.id
    const url = API_PATH + '/' + blogId + '/comments'
    await api
      .post(url)
      .send({blogId})
      .expect(400)
  })

  test('fail with 400 if empty comment was sent', async () => {
    const blogId = blogWithComments.id + '/comments'
    const url = API_PATH + '/' + blogId
    await api
      .post(url)
      .send({comment: '', blogId})
      .expect(400)
  })

})
