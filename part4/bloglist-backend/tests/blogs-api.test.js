const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const { initialBlogs, sampleNewBlog, getBlogsInDb, getNonExistingId } = require('./utils/test_helper_blogs.js')

const Blog = require('../models/blog')

const API_PATH = '/api/blogs'


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

afterAll(async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})

describe('when there are initially some blogs saved', () => {

  test('blogs are returned as json with status code 200', async () => {
    await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(API_PATH)
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('returned blog entry contains property "id" and not "_id"', async () => {
    const response = await api.get(API_PATH)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
  })

  test('a specific blog is returned within returned blogs', async () => {
    const response = await api.get(API_PATH)
    const contents = response.body.map(blog => blog.title)
    expect(contents).toContain('Canonical string reduction')
  })

})

describe('adding a new blog', () => {

  test('valid POST data returns successful with the new blog entry', async () => {
    const newBlogResponse = await api
      .post(API_PATH)
      .send(sampleNewBlog)
      .expect(201)

    expect(newBlogResponse.body.id).toBeDefined()
  })

  test('database contains one more entry than initial', async () => {
    const newBlogResponse = await api
      .post(API_PATH)
      .send(sampleNewBlog)
    const blogs = await getBlogsInDb()
    expect(blogs.length).toBe(initialBlogs.length + 1)
    expect(blogs).toContainEqual({...sampleNewBlog, id: newBlogResponse.body.id})
  })

  test('sending data without like property will default to 0', async () => {
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

  test('sending without title and author will fail with status 400', async () => {
    const newBlogEntry = {
      url: 'http://facebook.com'
    }
    await api
      .post(API_PATH)
      .send(newBlogEntry)
      .expect(400)
  })
})

describe('getting a blog with id', () => {

  test('successful with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id
    const response = await api
      .get(API_PATH + '/' + id)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe(blogs[0].title)
  })

  test('fails with 404 for invalid id', async () => {
    const invalidId = await getNonExistingId()
    await api
      .get(API_PATH + '/' + invalidId)
      .expect(404)
  })
})

describe('updating a blog entry', () => {

  test('successful with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }
    const response = await api
      .put(API_PATH + '/' + id)
      .send(updateData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.title).toBe('Updated Blog Title')
    expect(response.body.author).toBe('Updike Update II')
    expect(response.body.likes).toBe(99)
  })

  test('success results with new data in db', async () => {
    const blogs = await getBlogsInDb()
    const oldBlogData = blogs[0]
    const updateData = {
      title: 'Updated Blog Title',
      author: 'Updike Update II',
      likes: 99
    }

    await api
      .put(API_PATH + '/' + oldBlogData.id)
      .send(updateData)

    const blogsAfter = await getBlogsInDb()
    expect(blogsAfter.map(blog => blog.title)).toContain('Updated Blog Title')
    expect(blogsAfter.map(blog => blog.title)).not.toContain(oldBlogData.title)
    expect(blogsAfter.map(blog => blog.author)).toContain('Updike Update II')
    expect(blogsAfter.map(blog => blog.author)).not.toContain(oldBlogData.title)
  })

  test('fails with 404 for invalid id', async () => {
    const invalidId = await getNonExistingId()
    await api
      .get(API_PATH + '/' + invalidId)
      .expect(404)
  })
})

describe('deleting a blog', () => {

  test('successful with a valid id', async () => {
    const blogs = await getBlogsInDb()
    const id = blogs[0].id

    await api
      .delete(API_PATH + '/' + id)
      .expect(204)
  })

  test('success results with one less blog in db', async () => {
    const blogsBeforeDelete = await getBlogsInDb()
    const id = blogsBeforeDelete[0].id

    await api
      .delete(API_PATH + '/' + id)
      .expect(204)

    const blogsAfterDelete = await getBlogsInDb()

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
    const ids = blogsAfterDelete.map(blog => blog.id)
    expect(ids).not.toContain(id)
  })

  test('fails with an invalid id', async () => {
    const invalidId = await getNonExistingId()
    await api
      .delete(API_PATH + '/' + invalidId)
      .expect(404)
  })
})
