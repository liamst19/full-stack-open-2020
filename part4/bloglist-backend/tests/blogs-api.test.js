const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { initialBlogs, getBlogsInDb, getNonExistingId } = require('./test_helper')

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

  test('GET request should return correct number of blogs', async () => {
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

})
