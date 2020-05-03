const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { initialBlogs, sampleNewBlog, getBlogsInDb, getNonExistingId } = require('./test_helper')

const Blog = require('../models/blog')

const API_PATH = '/api/blogs'

describe('HTTP Requests to api/blogs', () => {

  let dbBlogs;

  beforeEach(async () => {
    await Blog.deleteMany({})
    dbBlogs = await Blog.insertMany(initialBlogs)
  })

  afterAll(async () => {
    await Blog.deleteMany({})
    mongoose.connection.close()
  })

  test('GET should return correct number of blogs', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('returned data contains property "id" and not "_id"', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })

  test('POST returns with the new blog entry, db has one more entry than initial', async () => {
    const newBlogResponse = await api
      .post(API_PATH)
      .send(sampleNewBlog)
      .expect(201)

    expect(newBlogResponse.body.id).toBeDefined()

    const blogs = await getBlogsInDb()
    expect(blogs.length).toBe(initialBlogs.length + 1)
    expect(blogs).toContainEqual({...sampleNewBlog, id: newBlogResponse.body.id})
  })

  test('POST without like property will default to 0', async () => {
    const newBlogEntry = {
      title: 'New Unliked Blog Title',
      author: 'Unliked Author',
      url: 'http://facebook.com'
    }
    const response = await api
      .post(API_PATH)
      .send(newBlogEntry)
      .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

})
